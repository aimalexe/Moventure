import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ToastNotify from '../../components/toast/ToastNotify';
import API from "../../utilities/api";
import { filterNonEmptyFields } from '../../utilities/objects.utilities';
import { capitalize, insertSpace } from "../../utilities/strings.utilities";
import "./auth.scss";
import { signUpSchema } from './validationSchema';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


const SignUpPage = () => {
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const formFields = {
        firstName: { placeholder: 'Enter your first name', type: "text", required: true },
        lastName: { placeholder: 'Enter your last name', type: "text", required: false },
        email: { placeholder: 'yourname@example.com', type: "email", required: true },
        password: { placeholder: 'Choose a strong password', type: "password", required: true },
        dateOfBirth: { placeholder: 'Select your birth date', type: "date", required: false },
        phoneNumber: { placeholder: '+000 123 456 789', type: "tel", required: false },
        address: { placeholder: 'Your full address', type: "text", required: false },
    };


    const handleSubmit = async (values, { resetForm }) => {
        try {
            const filteredValues = filterNonEmptyFields(values);
            const response = await API.post('/auth/signup', filteredValues, {
                headers: { "Content-Type": "application/json" }
            });

            const user = response.data.data;
            localStorage.setItem("token", response.headers["x-auth-token"]);
            login(user);

            resetForm();
            navigate("/");

            setToast({
                show: true,
                message: "Welcome. Sign up successful!",
                variant: "success"
            });

        } catch (err) {
            const errorMessage = err.response?.data?.data || "An error occurred";
            setToast({
                show: true,
                message: errorMessage,
                variant: "error"
            });
        }
    };


    return (
        <div className="auth">
            <Container fluid>
                <Row className="align-items-center">
                    <Col lg={4} md={3} className="signup-page left-section d-none d-md-block">
                        <div className="image-overlay">
                            <h1>Join Moventure</h1>
                            <p>Start Your Journey Today</p>
                            <p className="experience">
                                Sign up to discover amazing destinations, book accommodations, and find the best flights.
                            </p>
                        </div>
                    </Col>

                    <Col lg={8} md={9} xs={12} className="right-section">
                        <div className="form-container">
                            <h2 className='text-accent2'>Create Account</h2>
                            <Formik
                                initialValues={
                                    Object.keys(formFields).reduce((acc, key) => {
                                        acc[key] = '';
                                        return acc;
                                    }, {})
                                }
                                validationSchema={signUpSchema}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <FormikForm className='d-flex flex-column justify-content-center'>
                                        {Object.entries(formFields).map(([key, { placeholder, type, required }]) => (
                                            <Form.Group controlId={`form${key}`} className="my-3" key={key}>
                                                <Form.Label className={`me-2 ${required ? "required" : ""}`}>
                                                    {capitalize(insertSpace(key))} 
                                                </Form.Label>
                                                <Field
                                                    as={Form.Control}
                                                    type={type}
                                                    name={key}
                                                    placeholder={placeholder}
                                                    className={`border-accent2 ${errors[key] && touched[key] ? 'is-invalid' : ''}`}
                                                />
                                                <ErrorMessage name={key} component="div" className="text-danger mt-1 ms-3 small" />
                                            </Form.Group>
                                        ))}
                                        <Button type="submit" className="mx-auto btn btn-accent4">
                                            Create Account
                                        </Button>
                                    </FormikForm>
                                )}
                            </Formik>
                            <p className="login-link">
                                Already have an account? <Link to="/auth/signin" className='fw-bold'>Login</Link>
                            </p>
                            {toast.show && (
                                <ToastNotify
                                    show={toast.show}
                                    onClose={() => setToast({ ...toast, show: false })}
                                    message={toast.message}
                                    variant={toast.variant}
                                />
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignUpPage;