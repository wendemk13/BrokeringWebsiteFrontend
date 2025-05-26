// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './ChatPage.css';

// function ChatPage() {
//   const { senderId } = useParams();
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState('');

//   useEffect(() => {
//     fetch(`http://localhost:5000/api/chat/${senderId}`)
//       .then(res => res.json())
//       .then(data => setMessages(data))
//       .catch(err => console.error(err));
//   }, [senderId]);

//   const handleSend = () => {
//     if (!newMessage.trim()) return;

//     fetch('http://localhost:5000/api/chat/send', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         to: senderId,
//         message: newMessage,
//       }),
//     })
//     .then(res => res.json())
//     .then(data => {
//       setMessages([...messages, data]);
//       setNewMessage('');
//     })
//     .catch(err => console.error(err));
//   };

//   return (
//     <div className="chat-page">
//       <h2>Chat with User {senderId}</h2>
//       <div className="chat-box">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`chat-message ${msg.from_self ? 'self' : ''}`}>
//             {msg.message}
//           </div>
//         ))}
//       </div>
//       <div className="chat-input">
//         <input
//           type="text"
//           value={newMessage}
//           onChange={(e) => setNewMessage(e.target.value)}
//           placeholder="Type your message..."
//         />
//         <button onClick={handleSend}>Send</button>
//       </div>
//     </div>
//   );
// }

// export default ChatPage;


import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './ChatPage.css';

const ChatPage = () => {
  const { senderId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/chat/${senderId}`)
      .then(res => res.json())
      .then(data => setMessages(data))
      .catch(err => console.error(err));
  }, [senderId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);

  const handleSend = () => {
    const trimmedMessage = newMessage.trim();
    if (!trimmedMessage) return;

    fetch('http://localhost:5000/api/chat/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: senderId,
        message: trimmedMessage,
      }),
    })
    .then(res => res.json())
    .then(data => {
      setMessages([...messages, data]);
      setNewMessage('');
    })
    .catch(err => console.error(err));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chat with User {senderId}</h2>
      
      <div className="messages-container">
        {messages.map((msg, idx) => (
          <div 
            key={idx} 
            className={`message ${msg.from_self ? 'sent' : 'received'}`}
          >
            {msg.message}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="input-area">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default ChatPage;