import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem('user'));

    // If no user is logged in, redirect to login
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // If allowedRoles is specified, check if user has permission
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        // User doesn't have permission, redirect to dashboard
        return <Navigate to="/dashboard" replace />;
    }

    // User is authenticated and authorized
    return children;
};

export default ProtectedRoute;