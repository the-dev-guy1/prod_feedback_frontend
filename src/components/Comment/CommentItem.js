import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';

function CommentItem({ comment }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const accessToken = localStorage.getItem('user-token');
                if (!accessToken) {
                    // Handle scenario where access_token is not available
                    // Redirect to Logout page or show appropriate message
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
                const response = await axios.get(`/user/${comment.user_id}`);
                setUser(response.data.user);
            } catch (error) {
                // Handle fetch user error
            }
        };

        fetchUser();
    }, [comment.user_id]);

    return (
        <div className="comment-item">
            <p>{comment.text}</p>
            {user && (
                <p>
                    <strong>User:</strong> {user.name}
                </p>
            )}
        </div>
    );
}

export default CommentItem;