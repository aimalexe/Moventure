// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { user } = useAuth();
    const location = useLocation();

    // Redirect to the login page if not logged in Redirect them back to the page they originally requested
    if (!user) {
        return <Navigate to="/auth/signin" state={{ from: location }} replace />;
    }

    // Redirect to an unauthorized access page if the user doesn't have the required role
    if (roles && !roles.some(role => user.roles.includes(role))) {
        return <Navigate to="/unauthorized" replace />;
    }

    // If user is logged in and has required role, return the children components
    return children;
};

export default ProtectedRoute;
