import * as yup from "yup";

export const signUpSchema = yup.object({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string(),
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
    dateOfBirth: yup.date().nullable().transform(value => (value=== "" ? null : value)),
    phoneNumber: yup.string().matches(/^[+\d][\d\s()-]{7,}$/, 'Invalid phone number'),
    address: yup.string()
});

export const signInSchema = yup.object({
    email: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required'),
});