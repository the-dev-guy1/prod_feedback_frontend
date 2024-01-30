import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function FeedbackDetails() {
    const { id } = useParams();
    const [feedback, setFeedback] = React.useState({});
    const [comments, setComments] = React.useState([]);

    React.useEffect(() => {
        const fetchFeedbackDetails = async () => {
            try {
                const accessToken = localStorage.getItem('user-token');
                if (!accessToken) {
                    history.push('/logout');
                }
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const feedbackResponse = await axios.get(`http://localhost:8000/api/feedback/${id}`);
                const commentsResponse = await axios.get(`http://localhost:8000/api/feedback/${id}/comments`);

                if (typeof feedbackResponse.data.feedback === 'object') {
                    setFeedback(feedbackResponse.data.feedback);
                } else {
                    console.error('Invalid feedback data structure:', feedbackResponse.data.feedback);
                }

                if (Array.isArray(commentsResponse.data.comments)) {
                    setComments(commentsResponse.data.comments);
                } else {
                    console.error('Invalid comments data structure:', commentsResponse.data.comments);
                }
            } catch (error) {
                console.error('Error fetching feedback details:', error);
            }
        };

        fetchFeedbackDetails();
    }, [id]);

    return (
        <div className="container mt-4">
            <h2>Feedback Details</h2>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{feedback.title}</h5>
                    <p className="card-text">{feedback.description}</p>
                    <p className="card-text">Category: {feedback.category}</p>
                    <p className="card-text">User: {feedback.user ? feedback.user.name : 'Unknown'}</p>
                </div>
            </div>
            <h3 className="mt-4">Comments</h3>
            <ul className="list-group">
                {comments.map((comment) => (
                    <li key={comment.id} className="list-group-item">
                        <p>{comment.content}</p>
                        <p>By: {comment.user ? comment.user.name : 'Unknown'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FeedbackDetails;
