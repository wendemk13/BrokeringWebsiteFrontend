import React, { useEffect, useState } from 'react';
import './Feedbacks.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faPhone, faMessage, faClock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Feedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchFeedbacks = async () => {
  //     try {
  //       const response = await axios.get("${process.env.REACT_APP_API_URL}/api/feedback/getfeedbacks");
  //       setFeedbacks(response.data.data); // Access the data property from response
  //       setLoading(false);
  //     } catch (err) {
  //       setError(err.message);
  //       setLoading(false);
  //       console.error("Error fetching feedbacks:", err);
  //     }
  //   };

  //   fetchFeedbacks();
  // }, []);


  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/feedback/getfeedbacks`);
  
        // Sort by newest first
        const sortedFeedbacks = response.data.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
  
        setFeedbacks(sortedFeedbacks);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
        console.error("Error fetching feedbacks:", err);
      }
    };
  
    fetchFeedbacks();
  }, []);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="feedback-loading">
        <FontAwesomeIcon icon={faClock} spin />
        <span>Loading feedbacks...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="feedback-error">
        Error: {error}
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className="feedback-empty">
        No feedbacks available
      </div>
    );
  }

  return (
    <div className="feedback-container">
      <h1 className="feedback-header">Customer Feedbacks</h1>
      {feedbacks.map(feedback => (

      // <Link className="feedback-list" to={`/admin/sendreply/${feedback.id}`}>
      <Link
  className="feedback-list"
  to={{
    pathname: `/admin/sendreply/${feedback.id}`,
  }}
  state={{ message: feedback.message }} // <-- pass message here
>

          <div key={feedback.id} className="feedback-card">
            <div className="feedback-user">
              <FontAwesomeIcon icon={faUser} className="feedback-icon" />
              <span className="feedback-name">{feedback.name}</span>
            </div>
            <div className="feedback-detail">
              <FontAwesomeIcon icon={faEnvelope} className="feedback-icon" />
              <span>{feedback.email}</span>
            </div>
            <div className="feedback-detail">
              <FontAwesomeIcon icon={faPhone} className="feedback-icon" />
              <span>{feedback.phone}</span>
            </div>
            <div className="feedback-message">
              <FontAwesomeIcon icon={faMessage} className="feedback-icon" />
              <p>{feedback.message}</p>
            </div>
            <div className="feedback-date">
              <FontAwesomeIcon icon={faClock} className="feedback-icon" />
              <span>{formatDate(feedback.created_at)}</span>
            </div>
          </div>
          </Link>

        ))}
    </div>
  );
}

export default Feedbacks;