import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Form, Button, Container } from 'react-bootstrap';

function Register() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async () => {
        try {
            await register(formData);
            // Redirect to FeedbackList page after successful registration
            navigate('/');
        } catch (error) {
            // Handle registration error
            console.error('Registration failed:', error);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="align-content-center">Register</h2>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter your name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                </Form.Group>

                <Button variant="primary" type="button" onClick={handleRegister}>
                    Register
                </Button>
            </Form>
        </Container>
    );
}

export default Register;
