import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user } = useAuth();

    return (
        <Routes>
            <Route
                {...rest}
                element={user ? <Component /> : <Navigate to="/login" replace />}
            />
        </Routes>
    );
};

export default PrivateRoute;