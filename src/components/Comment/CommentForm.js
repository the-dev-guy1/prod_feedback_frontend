import React, { useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the styles

function CommentForm({ feedbackId }) {
    const [formData, setFormData] = useState({ content: '' });

    const handleCreateComment = async () => {
        try {
            const accessToken = localStorage.getItem('user-token');

            if (!accessToken) {
                // Handle scenario where access_token is not available
                return;
            }

            // Include access_token in the request headers
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            await axios.post(`http://localhost:8000/api/feedback/${feedbackId}/comments`, formData);
            // Handle successful comment creation
            // You may want to refresh the comments or perform other actions
        } catch (error) {
            // Handle comment creation error
        }
    };

    return (
        <div className="mt-4">
            <h4>Add Comment</h4>
            <ReactQuill
                value={formData.content}
                onChange={(value) => setFormData({ ...formData, content: value })}
            />
            <button type="button" onClick={handleCreateComment}>
                Add Comment
            </button>
        </div>
    );
}

export default CommentForm;
