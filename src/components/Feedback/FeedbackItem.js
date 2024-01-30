import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackItem({ feedback }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = localStorage.getItem('user-token');
                if (!accessToken) {
                    // Handle scenario where access_token is not available
                    return;
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const response = await axios.get(`http://localhost:8000/api/user/${feedback.user_id}`);
                setUser(response.data.user);
            } catch (error) {
                // Handle error fetching user
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [feedback.user_id]);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{feedback.title}</h5>
                <p className="card-text">{feedback.description}</p>
                <p className="card-text">Category: {feedback.category}</p>
                <p className="card-text">User: {user.name}</p>
            </div>
        </div>
    );
}

export default FeedbackItem;
