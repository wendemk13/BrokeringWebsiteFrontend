// import React, { useEffect, useState } from 'react';
// import './SendReply.css';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import { message as antdMessage } from 'antd';

// function SendReply() {
//   const [Message, setMessage] = useState('');
//   const [adminId, setAdminId] = useState(null);
//   const { feedbackid } = useParams();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (user && user.id) {
//       setAdminId(user.id);
//     }
//   }, []);

//   const submitMessage = async (e) => {
//     e.preventDefault();

//     if (!Message) {
//       antdMessage.error('Please enter a message.');
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/replies/sendreply/${feedbackid}/${adminId}`,
//         { message: Message }
//       );
//       if (response.data.reply) {
//         antdMessage.success('Reply sent successfully!');
//         setMessage('');
//       }
//     } catch (error) {
//       console.error(error);
//       antdMessage.error('Failed to send reply.');
//     }
//   };

//   return (
//     <div className='sendreply_container'>
//       <form onSubmit={submitMessage}>
//         <input
//           type='text'
//           name='message'
//           value={Message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder='Write your reply...'
//         />
//         <input type='submit' value='Send' />
//       </form>
//     </div>
//   );
// }

// export default SendReply;


import React, { useState, useEffect } from 'react';
import './SendReply.css';
import { useParams, useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function SendReply() {
  const { feedbackid } = useParams();
  const location = useLocation();

  const [adminId, setAdminId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');

  const feedbackMessage = location.state?.message || 'No message provided';

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user?.id) {
      setAdminId(user.id);
    }
  }, []);

  const submitMessage = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/replies/sendreply/${feedbackid}/${adminId}`,
        { message: replyMessage }
      );
      alert('Reply sent!');
      setReplyMessage('');
    } catch (err) {
      console.error(err);
      alert('Error sending reply');
    }
  };

  return (
    <div className="reply-container">
      <div className="reply-header">
        <Link to="/admin/feedbacks" className="back-button">
          &larr; Back to Feedbacks
        </Link>
        <h2>Send Reply</h2>
      </div>

      <div className="feedback-card">
        <div className="feedback-meta">
          <h3>Feedback Message</h3>
          <p>{feedbackMessage}</p>
        </div>
      </div>

      <form onSubmit={submitMessage} className="reply-card">
        <textarea
          className="reply-textarea"
          name="message"
          placeholder="Enter your reply..."
          value={replyMessage}
          onChange={(e) => setReplyMessage(e.target.value)}
          required
        />

        <div className="reply-actions">
          <button type="submit" className="ant-btn-primary">
            Send Reply
          </button>
        </div>
      </form>
    </div>
  );
}

export default SendReply;
