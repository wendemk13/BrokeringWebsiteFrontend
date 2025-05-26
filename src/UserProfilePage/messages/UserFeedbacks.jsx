import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserFeedbacks.css';

function UserFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_id = user?.id;

    if (user_id) {
      fetch(`http://localhost:5000/api/feedback/getuserfeedbacks/${user_id}`)
        .then(res => res.json())
        .then(data => {
          setFeedbacks(data?.data || []);
        })
        .catch(err => {
          console.error('Error fetching feedbacks:', err);
          setError('Failed to fetch feedbacks.');
        });
    } else {
      setError('User ID not found.');
    }
  }, []);

  const handleFeedbackClick = (feedbackId) => {
    navigate(`/message-detail/${feedbackId}`);
  };

  return (
    <div className="user-feedbacks">
      <h2>Your Feedbacks</h2>
      {error && <p className="error">{error}</p>}
      {feedbacks.length > 0 ? (
        <ul className="feedback-list">
          {feedbacks.map((fb) => (
            <li 
              key={fb.id} 
              className="feedback-item"
              onClick={() => handleFeedbackClick(fb.id)}
            >
              <p><strong>Name:</strong> {fb.name}</p>
              <p><strong>Email:</strong> {fb.email}</p>
              <p><strong>Phone:</strong> {fb.phone}</p>
              <p><strong>Message:</strong> {fb.message.substring(0, 50)}...</p>
            </li>
          ))}
        </ul>
      ) : (
        !error && <p>No feedbacks found.</p>
      )}
    </div>
  );
}

export default UserFeedbacks;