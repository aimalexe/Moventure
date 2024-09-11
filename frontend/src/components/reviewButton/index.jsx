import { ErrorMessage, Field, Formik, Form as FormikForm } from 'formik';
import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'; // Assuming you have an AuthContext
import API from "../../utilities/api";
import { capitalize } from "../../utilities/strings.utilities";
import './reviewButton.scss';

import * as Yup from 'yup';

const reviewSchema = Yup.object({
    entityId: Yup.string().required('Entity ID is required'),
    entityType: Yup.string()
        .oneOf(['flight', 'destination', 'accommodation'], 'Invalid entity type')
        .required('Entity type is required'),
    comment: Yup.string().required('Comment is required'),
    rating: Yup.number()
        .integer()
        .min(1, 'Rating must be at least 1')
        .max(5, 'Rating must be at most 5')
        .required('Rating is required'),
});


const ReviewButton = ({ entityId, entityType }) => {
    const [show, setShow] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });
    const { token } = useAuth();

    const formFields = {
        comment: { placeholder: 'Enter your review', type: "textarea", required: true },
        rating: { placeholder: 'Select your rating', type: "range", required: true }
    };

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const response = await API.post('/review', {
                entityId: entityId,
                entityType: entityType,
                comment: values.comment,
                rating: values.rating,
            }, {
                headers: { 'x-auth-token': token }
            });

            setToast({
                show: true,
                message: "Review submitted successfully!",
                variant: "success"
            });

            resetForm();
            setShow(false);
        } catch (err) {
            const errorMessage = err.response?.data?.message || "An error occurred";
            setToast({
                show: true,
                message: errorMessage,
                variant: "error"
            });
        }
    };

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <span key={index} className="star fs-4">
                {index < rating ? '★' : '☆'}
            </span>
        ));
    };

    return (
        <>
            <Button variant="primary" onClick={() => setShow(true)}>
                Add Review
            </Button>

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Submit a Review</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={
                            Object.keys(formFields).reduce((acc, key) => {
                                acc[key] = key === 'rating' ? 0 : '';
                                return acc;
                            }, {})
                        }
                        validationSchema={reviewSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ values, errors, touched, setFieldValue }) => (
                            <FormikForm className='d-flex flex-column justify-content-center'>
                                {Object.entries(formFields).map(([key, { placeholder, type, required }]) => (
                                    <Form.Group controlId={`form${key}`} className="my-3" key={key}>
                                        <Form.Label className={`me-2 ${required ? "required" : ""}`}>
                                            {capitalize(key)}
                                        </Form.Label>
                                        {key === 'rating' ? (
                                            <>
                                                <div className="star-rating">
                                                    {renderStars(values.rating)}
                                                </div>
                                                <Field
                                                    as={Form.Control}
                                                    type={type}
                                                    name={key}
                                                    min="1"
                                                    max="5"
                                                    value={values.rating}
                                                    onChange={(e) => setFieldValue(key, e.target.value)}
                                                    className={`border-accent2`}
                                                />
                                            </>
                                        ) : (
                                            <Field
                                                as={Form.Control}
                                                type={type}
                                                name={key}
                                                placeholder={placeholder}
                                                className={`border-accent2`}
                                            />
                                        )}
                                        <ErrorMessage name={key} component="div" className="text-danger mt-1 ms-3 small" />
                                    </Form.Group>
                                ))}
                                <Button type="submit" className="mx-auto btn btn-accent4">
                                    Submit Review
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </Modal.Body>
            </Modal>

            {toast.show && (
                <ToastNotify
                    show={toast.show}
                    onClose={() => setToast({ ...toast, show: false })}
                    message={toast.message}
                    variant={toast.variant}
                />
            )}
        </>
    );
};

export default ReviewButton;
