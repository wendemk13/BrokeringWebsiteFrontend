
// import React, { useState } from 'react';
// import axios from 'axios';
// import './ContactOwner.css';

// function ContactOwner({ listingId, contactType }) {
//   const [message, setMessage] = useState('');
//   const [status, setStatus] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [senderName, setSenderName] = useState('');
//   const [senderEmail, setSenderEmail] = useState('');
//   const maxChars = 500;

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!message.trim() || !senderName.trim() || !senderEmail.trim()) {
//       setStatus({ type: 'error', text: 'All fields are required.' });
//       return;
//     }
//   // // for house
//   //  const listingId=24;
//   //  const contactType="house";
//   // //  for car
//   //  const listingId=31;
//   //  const contactType="car";

//     setLoading(true);

//     const payload = {
//       contact_type: contactType,
//       sender_name: senderName,
//       sender_email: senderEmail,
//       message: message
//     };

//     if (contactType === 'house') {
//       payload.house_id = listingId;
//     } else if (contactType === 'car') {
//       payload.car_id = listingId;
//     }

//     try {
//       await axios.post('${process.env.REACT_APP_API_URL}/api/contact', payload);
//       setStatus({ type: 'success', text: 'Message sent to the owner!' });
//       setMessage('');
//       setSenderName('');
//       setSenderEmail('');
//     } catch (error) {
//       console.error(error);
//       setStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="contact-owner-container">
//       <h2>Contact Owner</h2>
//       <form onSubmit={handleSubmit} className="contact-form">
//         <input
//           type="text"
//           placeholder="Your Name"
//           value={senderName}
//           onChange={(e) => setSenderName(e.target.value)}
//           disabled={loading}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Your Email"
//           value={senderEmail}
//           onChange={(e) => setSenderEmail(e.target.value)}
//           disabled={loading}
//           required
//         />
//         <textarea
//           className="contact-textarea"
//           placeholder="Write your message here..."
//           value={message}
//           maxLength={maxChars}
//           onChange={(e) => setMessage(e.target.value)}
//           rows={6}
//           disabled={loading}
//         />
//         <div className="char-count">{message.length} / {maxChars}</div>
//         <button type="submit" className="contact-submit-btn" disabled={loading}>
//           {loading ? 'Sending...' : 'Send Message'}
//         </button>
//       </form>
//       {status && (
//         <p className={`status-message ${status.type}`}>
//           {status.text}
//         </p>
//       )}
//     </div>
//   );
// }

// export default ContactOwner;import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ContactOwner.css';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next"; // <-- added this import

function ContactOwner({ listingId, contactType }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const maxChars = 500;

  // Get user info from localStorage on mount
  const [user, setUser] = useState(null);


    const {t,i18n}=useTranslation();
      const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      };
  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // or whatever key you store under
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus({ type: 'error', text: 'Message field is required.' });
      return;
    }
    if (!user) {
      setStatus({ type: 'error', text: 'User info not found. Please login.' });
      return;
    }

    setLoading(true);

    const payload = {
      user_id: user.id,
      contact_type: contactType,
      sender_name: user.username,
      sender_email: user.email,
      message: message,
    };
    

    if (contactType === 'house') {
      payload.house_id = listingId;
    } else if (contactType === 'car') {
      payload.car_id = listingId;
    }

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/contact`, payload);
      setStatus({ type: 'success', text: <>{t(`Message sent to the owner!`)}</> });
      setMessage('');
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-owner-container">
      <h2>{t(`Contact Owner`)}</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <textarea
          className="contact-textarea"
          placeholder={t("Write your message here...")}
          value={message}
          maxLength={maxChars}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          disabled={loading}
          required
        />
        <div className="char-count">{message.length} / {maxChars}</div>
        <button type="submit" className="contact-submit-btn" disabled={loading}>
          {loading ? <>{t('Sending...')}</> : <>{t('Send Message')}</>}
        </button>
      </form>
      {status && (
        <p className={`status-message ${status.type}`}>
          {status.text}
        </p>
      )}
    </div>
  );
}

export default ContactOwner;
