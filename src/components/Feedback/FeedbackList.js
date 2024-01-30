import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FeedbackItem from './FeedbackItem';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

function FeedbackList() {
    const [feedbackList, setFeedbackList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const accessToken = localStorage.getItem('user-token');
                if (!accessToken) {
                    // Handle scenario where access_token is not available
                    navigate('/logout'); // Redirect to Logout page
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const response = await axios.get('http://localhost:8000/api/feedback');

                // Check if the response contains the expected array structure
                if (Array.isArray(response.data.feedback)) {
                    setFeedbackList(response.data.feedback);
                } else {
                    // Handle the case where the expected array is not received
                    console.error('Invalid feedback data structure:', response.data.feedback);
                }
            } catch (error) {
                // Handle fetch feedback error
                console.error('Error fetching feedback:', error);
            }
        };

        fetchFeedback();
    }, [navigate]);

    const navigateToFeedbackForm = () => {
        navigate('/feedback/create');
    };

    return (
        <Container className="mt-4">
            <div className="d-flex justify-content-between align-items-center">
                <h2>Feedback List</h2>
                <Button variant="primary" onClick={navigateToFeedbackForm}>
                    Create Feedback
                </Button>
            </div>
            {feedbackList.map((feedback) => (
                <FeedbackItem key={feedback.id} feedback={feedback} />
            ))}
        </Container>
    );
}

export default FeedbackList;
