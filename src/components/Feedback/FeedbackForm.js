import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function FeedbackForm() {
    const [formData, setFormData] = useState({ title: '', description: '', category: '' });
    const navigate = useNavigate();

    const categories = [
        { id: 1, name: 'Bug Report' },
        { id: 2, name: 'Feature Request' },
        { id: 3, name: 'Improvement' },
        { id: 4, name: 'Others' },
    ];


    const handleCreateFeedback = async () => {
        try {
            const accessToken = localStorage.getItem('user-token');
            if (!accessToken) {
                // Handle scenario where access_token is not available
                navigate('/login'); // Redirect to Logout page
                return;
            }

            // Include access_token in the request headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            await axios.post('http://localhost:8000/api/feedback', formData);
            // Redirect or handle successful feedback creation
            navigate('/'); // Redirect to FeedbackList page
        } catch (error) {
            // Handle feedback creation error
            console.error('Error creating feedback:', error);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Create Feedback</h2>
            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Title:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Control
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Category:
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </Form.Select>
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Description:
                    </Form.Label>
                    <Col sm={10}>
                        <ReactQuill
                            value={formData.description}
                            onChange={(value) => setFormData({ ...formData, description: value })}
                            theme="snow"
                        />
                    </Col>
                </Form.Group>

                <Button type="button" onClick={handleCreateFeedback}>
                    Create Feedback
                </Button>
            </Form>
        </Container>
    );
}

export default FeedbackForm;