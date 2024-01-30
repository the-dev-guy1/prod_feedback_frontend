import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import FeedbackForm from './components/Feedback/FeedbackForm';
import FeedbackList from './components/Feedback/FeedbackList';
import PortalNavbar from './PortalNavbar';  // Import PortalNavbar
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
    const accessToken = localStorage.getItem('access_token');

    return (
        <AuthProvider>
            <Router>
                {/* Include PortalNavbar outside of the Routes */}
                <PortalNavbar />

                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<FeedbackList />} />
                    <Route path="/feedback/create" element={<FeedbackForm />} />
                    {accessToken ? (
                        <Route path="/" element={<FeedbackList />} />
                    ) : (
                        <Route path="/" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
