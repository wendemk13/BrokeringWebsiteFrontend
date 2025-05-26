import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MailOutlined, MessageOutlined, NotificationOutlined, StarOutlined } from '@ant-design/icons';
import './Messages.css'; // Create this CSS file

function Messages() {
  const [user_id,setuser_id]=useState('');
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("user"));
    setuser_id(user?.id);
      })
  return (
    <div className="messages-container">
      <h2 className="messages-header">Messages Center</h2>
      
      <div className="messages-links">
        <Link to={`/user/userFeedbacks/${user_id}`} className="message-link">
          <StarOutlined className="link-icon" />
          <span>Feedbacks</span>
        </Link>
      

        <Link to="/user/InboxMessages" className="message-link">
          <MailOutlined className="link-icon" />
          <span>Inbox Messages</span>
        </Link>
        
        {/* Suggested additional links */}
        <Link to="/user/sent-messages" className="message-link">
          <MessageOutlined className="link-icon" />
          <span>Sent Messages</span>
        </Link>
        
        <Link to="/user/notifications" className="message-link">
          <NotificationOutlined className="link-icon" />
          <span>Notifications</span>
        </Link>
        
        <Link to="/user/archived-messages" className="message-link">
          <MailOutlined className="link-icon" />
          <span>Archived</span>
        </Link>
      </div>
    </div>
  );
}

export default Messages;