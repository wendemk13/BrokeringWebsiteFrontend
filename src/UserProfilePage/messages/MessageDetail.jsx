import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MessageDetail.css';
import axios from 'axios';

function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replies,setreplies]=useState([])


  useEffect(() => {


    const fetchMessage = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/feedback/getfeedbacks/${id}`);
        const data = await response.json();
        
        if (response.ok) {
          // Update this line to match your API response structure
          setMessage(data.feedback[0]); // Access the first item in the feedback array
        } else {
          setError(data.error || 'Failed to fetch message details');
        }
      } catch (err) {
        setError('An error occurred while fetching the message');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchreplies=async ()=>{
        // const feedback_id=id;
       try {
        const response=await axios.get(`http://localhost:5000/api/replies/getAll/${id}`);
        setreplies(response.data.replies);
        console.log(response)
       } catch (error) {
        console.error('Error fetching listings:', error);
       }
    }

    fetchreplies();
    fetchMessage();
  }, [id]);

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) return <div className="message-detail">Loading...</div>;
  if (error) return <div className="message-detail error">{error}</div>;
  if (!message) return <div className="message-detail">No message found</div>;

  return (
    <div className="message-detail">
      <button onClick={handleBack} className="back-button">
        &larr; Back to Messages
      </button>
      
      <h2>Message Details</h2>
      
      <div className="message-content">
        <div className="message-field">
          <span className="field-label">From:</span>
          <span className="field-value">{message.name}</span>
        </div>
        <div className="message-field">
          <span className="field-label">Email:</span>
          <span className="field-value">{message.email}</span>
        </div>
        <div className="message-field">
          <span className="field-label">Phone:</span>
          <span className="field-value">{message.phone}</span>
        </div>
        <div className="message-field full-width">
          <span className="field-label">Message:</span>
          <p className="field-value message-text">{message.message}</p>
        </div>
        <div className="message-field">
          <span className="field-label">Date:</span>
          <span className="field-value">
            {new Date(message.created_at).toLocaleString()}
          </span>
        </div>
      </div>

      <h2>Message Replays</h2>
      {
        replies.length > 0 ?  (<ul>
        {
            replies.map(reply=>(
                <li>{reply.message} by {reply.admin_id} </li>
            ))
        }
        
        </ul>) : (<>
        <h3>No Replies</h3>
        </>)
      }

    </div>
  );
}

export default MessageDetail;