



// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './InboxMessages.css';
// import { useTranslation } from 'react-i18next';

// function InboxMessages() {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const [userId, setUserId] = useState(null);
//   const {t,i18n}=useTranslation();
//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   useEffect(() => {
//     const fetchMessages = async () => {
//       try {
//         const user = JSON.parse(localStorage.getItem('user'));
//         if (!user || !user.id) {
//           throw new Error('User not authenticated');
//         }
//         setUserId(user.id);

//         const response = await axios.get(`http://localhost:5000/api/contacts/${user.id}`, {
//           headers: {
//             'Authorization': `Bearer ${localStorage.getItem('token')}`
//           }
//         });

//         setMessages(response.data);
//       } catch (err) {
//         setError(err.response?.data?.message || err.message || 'Failed to fetch messages');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMessages();
//   }, []); // Empty dependency array means this runs once on mount

//   const handleMessageClick = (msg) => {
//     navigate(`/chat/${msg.user_id}`);
//   };

//   if (loading) return <div className="inbox-status">Loading messages...</div>;
//   if (error) return <div className="inbox-status error">{error}</div>;
//   if (messages.length === 0) return <div className="inbox-status">No messages found.</div>;

//   return (
//     <div className="inbox-container">
//       <h2>Inbox Messages</h2>
//       <ul className="message-list">
//         {messages.map((msg) => (
//           <li 
//             key={msg.id} 
//             className="message-card" 
//             onClick={() => handleMessageClick(msg)}
//           >
//             <div className="message-body">{msg.message}</div>
//             <div className="message-footer">
//               <span className="sender-name">
//                 <strong>From:</strong> {msg.sender_name || 'Anonymous'}
//               </span>
//               <span className="date">
//                 {new Date(msg.created_at).toLocaleString()}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default InboxMessages;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './InboxMessages.css';
import { useTranslation } from 'react-i18next';

function InboxMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.id) {
          throw new Error(t('User not authenticated'));
        }

        const response = await axios.get(`http://localhost:5000/api/contacts/${user.id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        setMessages(response.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message || t('Failed to fetch messages'));
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [t]);

  const handleMessageClick = (msg) => {
    navigate(`/chat/${msg.user_id}`);
  };

  if (loading) return <div className="inbox-status">{t('Loading messages...')}</div>;
  if (error) return <div className="inbox-status error">{error}</div>;
  if (messages.length === 0) return <div className="inbox-status">{t('No messages found.')}</div>;

  return (
    <div className="inbox-container">
      <h2>{t('Inbox Messages')}</h2>
      <ul className="message-list">
        {messages.map((msg) => (
          <li 
            key={msg.id} 
            className="message-card" 
            onClick={() => handleMessageClick(msg)}
          >
            <div className="message-body">{msg.message}</div>
            <div className="message-footer">
              <span className="sender-name">
                <strong>{t('From')}:</strong> {msg.sender_name || t('Anonymous')}
              </span>
              <span className="date">
                {new Date(msg.created_at).toLocaleString()}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InboxMessages;
