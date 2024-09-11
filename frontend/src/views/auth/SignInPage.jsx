import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ToastNotify from '../../components/toast/ToastNotify';
import { useAuth } from '../../contexts/AuthContext';
import API from "../../utilities/api";
import { filterNonEmptyFields } from '../../utilities/objects.utilities';
import { capitalize } from "../../utilities/strings.utilities";
import "./auth.scss";
import { signInSchema } from './validationSchema'; // Create a validation schema if needed

const SignInPage = () => {
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });
    const navigate = useNavigate();
    const { login } = useAuth();

    const formFields = {
        email: { placeholder: 'yourname@example.com', type: "email", required: true },
        password: { placeholder: 'Your previous strong password', type: "password", required: true }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const filteredValues = filterNonEmptyFields(values);
            const response = await API.post('/auth/login', filteredValues, {
                headers: { "Content-Type": "application/json" }
            });

            setToast({
                show: true,
                message: "Welcome Back. Login successful!",
                variant: "success"
            });

            const user = response.data.data;
            localStorage.setItem("token", response.headers["x-auth-token"]);
            login(user);

            resetForm();
            navigate("/");
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
                    <Col lg={4} md={3} className="signin-page left-section d-none d-md-block">
                        <div className="image-overlay">
                            <h1>Welcome Back to Moventure</h1>
                            <p>Continue Your Adventure</p>
                            <p className="experience">
                                Sign in to access your personalized travel plans and exclusive deals.
                            </p>
                        </div>
                    </Col>
                    <Col lg={8} md={9} xs={12} className="right-section">
                        <div className="form-container">
                            <h2 className='text-accent2'>Login to Account</h2>
                            <Formik
                                initialValues={
                                    Object.keys(formFields).reduce((acc, key) => {
                                        acc[key] = '';
                                        return acc;
                                    }, {})
                                }
                                validationSchema={signInSchema} // Add validation schema if needed
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <FormikForm className='d-flex flex-column justify-content-center'>
                                        {Object.entries(formFields).map(([key, { placeholder, type, required }]) => (
                                            <Form.Group controlId={`form${key}`} className="my-3" key={key}>
                                                <Form.Label className={`me-2 ${required ? "required" : ""}`}>
                                                    {capitalize(key)}
                                                </Form.Label>
                                                <Field
                                                    as={Form.Control}
                                                    type={type}
                                                    name={key}
                                                    placeholder={placeholder}
                                                    className={`border-accent2`}
                                                />
                                                <ErrorMessage name={key} component="div" className="text-danger mt-1 ms-3 small" />
                                            </Form.Group>
                                        ))}
                                        <Button type="submit" className="mx-auto btn btn-accent4">
                                            Login
                                        </Button>
                                    </FormikForm>
                                )}
                            </Formik>
                            <p className="login-link">
                                {/* todo: implement reset logic */}
                                Forgot Password? <Link to="#" className='fw-bold'>Reset Here</Link>
                            </p>
                            <p className="login-link">
                                Don't have an account? <Link to="/auth/signup" className='fw-bold'>Sign Up</Link>
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

export default SignInPage;
