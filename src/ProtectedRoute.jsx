import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
    const isAuthenticated = localStorage.getItem('uid'); 

    if (!isAuthenticated) {
        return <Navigate to="/log" />; 
    }

    return children;
}


