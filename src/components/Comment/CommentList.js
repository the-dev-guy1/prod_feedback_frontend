import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import CommentItem from './CommentItem';

function CommentList({ feedbackId }) {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const accessToken = localStorage.getItem('user-token');
                if (!accessToken) {
                    // Handle scenario where access_token is not available
                    // Redirect to Logout page or show appropriate message
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const response = await axios.get(`/feedback/${feedbackId}/comments`);

                // Check if the response contains the expected array structure
                if (Array.isArray(response.data.comments)) {
                    setComments(response.data.comments);
                } else {
                    // Handle the case where the expected array is not received
                    console.error('Invalid comments data structure:', response.data.comments);
                }
            } catch (error) {
                // Handle fetch comments error
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [feedbackId]);

    return (
        <div className="comment-list">
            <h4>Comments</h4>
            {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
            ))}
        </div>
    );
}

export default CommentList;