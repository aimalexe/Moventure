import React, { useState, useEffect, useRef, useMemo } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import { Formik, Field, ErrorMessage, Form as FormikForm } from "formik";
import * as yup from "yup";
import "./profile.scss";
import { useAuth } from "../../contexts/AuthContext";
import API from "../../utilities/api";
import ToastNotify from "../../components/toast/ToastNotify";
import { filterNonEmptyFields } from "../../utilities/objects.utilities";
import useOutsideClick from "../../hooks/useOutsideClick";

const ProfileModal = ({ show, handleClose, children }) => (
    <Modal show={show} onHide={handleClose} dialogClassName="profile-modal" centered>
        {children}
    </Modal>
);

const ProfileCard = ({ profileRef, children }) => (
    <Card ref={profileRef} className="profile-card">
        <Card.Body>{children}</Card.Body>
    </Card>
);

const UpdateProfileForm = ({ initialValues, onSave }) => {
    const profileUpdateValidation = yup.object({
        firstName: yup.string().required("First name is required"),
        lastName: yup.string(),
        email: yup.string().email("Invalid email format").required("Email is required"),
        dateOfBirth: yup.date().nullable().transform((value) => (value === "" ? null : value)),
        phoneNumber: yup.string().matches(/^[+\d][\d\s()-]{7,}$/, "Invalid phone number"),
        address: yup.string(),
    });

    const formatLabel = (key) => key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");

    return (
        <Formik initialValues={initialValues} validationSchema={profileUpdateValidation} onSubmit={onSave}>
            {({ errors, touched }) => (
                <FormikForm className="d-flex flex-column justify-content-center">
                    {Object.keys(initialValues).map((key) => (
                        <Form.Group controlId={`form${key}`} className="my-2" key={key}>
                            <Form.Label className={`me-2 ${key === "firstName" || key === "email" ? "required" : ""}`}>
                                {formatLabel(key)}
                            </Form.Label>
                            <Field
                                as={Form.Control}
                                type={key === "dateOfBirth" ? "date" : "text"}
                                name={key}
                                placeholder={`Enter your ${key}`}
                                className={`border-accent2 ${errors[key] && touched[key] ? "is-invalid" : ""}`}
                            />
                            <ErrorMessage name={key} component="div" className="text-danger mt-1 ms-3 small" />
                        </Form.Group>
                    ))}
                    <Button type="submit" className="ms-auto btn btn-accent4">
                        Save Profile
                    </Button>
                </FormikForm>
            )}
        </Formik>
    );
};

const ProfileDetails = ({ userData }) => (
    <>
        {userData.dateOfBirth && (
            <p>
                Date of Birth:{" "}
                <strong className="ms-2">
                    <time dateTime={userData.dateOfBirth}>{userData.dateOfBirth.slice(0, 10)}</time>
                </strong>
            </p>
        )}
        {userData.phoneNumber && (
            <p>
                Phone Number: <strong className="ms-2">{userData.phoneNumber}</strong>
            </p>
        )}
        {userData.address && (
            <div>
                Address:{" "}
                <strong className="ms-2">
                    <address className="d-inline">{userData.address}</address>
                </strong>
            </div>
        )}
    </>
);

const ProfileInfo = ({ isEditing, userData, onSave, onClose, onEdit }) => {
    const initials = `${userData?.firstName?.charAt(0)}${userData?.lastName?.charAt(0)}`;

    return (
        <>
            <div className="d-flex justify-content-between align-items-center wrap-reverse">
                <div className="profile-info">
                    <div className="profile-initials fs-5 bg-accent2 text-white">{initials}</div>
                    <div>
                        <h4 className="text-accent2 h4">{`${userData.firstName} ${userData.lastName}`}</h4>
                        <a className="text-accent4 text-decoration-none fs-6" href={`mailto:${userData.email}`}>
                            {userData.email}
                        </a>
                    </div>
                </div>
                <Button variant="outline-accent4" onClick={onClose}>
                    &times;
                </Button>
            </div>
            <hr />
            <div className="profile-details text-muted">
                {isEditing ? (
                    <UpdateProfileForm initialValues={userData} onSave={onSave} />
                ) : (
                    <ProfileDetails userData={userData} />
                )}
            </div>
            {!isEditing && (
                <Button variant="accent4" className="mt-3" onClick={onEdit}>
                    Edit Profile
                </Button>
            )}
        </>
    );
};

const Profile = ({ show, handleClose }) => {
    const profileRef = useOutsideClick(handleClose);
    const { user, login } = useAuth();

    const initialUserData = useMemo(() => ({
        firstName: user?.firstName ?? "Guest",
        lastName: user?.lastName ?? "User",
        email: user?.email,
        dateOfBirth: user?.dateOfBirth,
        phoneNumber: user?.phoneNumber,
        address: user?.address,
    }), [user]);

    const [userData, setUserData] = useState(initialUserData);
    const [isEditing, setIsEditing] = useState(false);
    const [toast, setToast] = useState({ show: false, message: "", variant: "" });

    // Update userData when user changes
    useEffect(() => {
        setUserData(initialUserData);
    }, [initialUserData]);

    const handleSave = async (values) => {
        try {
            const filteredValues = filterNonEmptyFields(values);
            const response = await API.put(`/user/${user?.id}`, filteredValues, {
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-token": localStorage.getItem("token"),
                },
            });

            const updatedUser = response.data.data;
            setUserData(updatedUser);
            login(updatedUser);
            setToast({
                show: true,
                message: "Update successful!",
                variant: "success",
            });
        } catch (error) {
            const errorMessage = error.response?.data?.data || "An error occurred while updating your profile.";
            setToast({
                show: true,
                message: errorMessage,
                variant: "error",
            });
        } finally {
            setIsEditing(false);
        }
    };

    return (
        <>
            <ProfileModal show={show} handleClose={handleClose}>
                <ProfileCard profileRef={profileRef}>
                    <ProfileInfo
                        isEditing={isEditing}
                        userData={userData}
                        onSave={handleSave}
                        onClose={handleClose}
                        onEdit={() => setIsEditing(true)}
                    />
                </ProfileCard>
            </ProfileModal>
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

export default Profile;
