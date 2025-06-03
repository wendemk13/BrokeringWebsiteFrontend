

// import React, { useState, useEffect, useRef } from 'react';
// import './ChatbotPage.css';

// const ChatbotPage = () => {
//   const [messages, setMessages] = useState([]);
//   const [inputValue, setInputValue] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [connectionStatus, setConnectionStatus] = useState('disconnected');
//   const [modelLoading, setModelLoading] = useState(true);
//   const messagesEndRef = useRef(null);

//   // Rasa server configuration
//   const RASA_SERVER_URL = 'http://localhost:5005/webhooks/rest/webhook';
//   const [senderId] = useState('user_' + Math.random().toString(36).substr(2, 9));

//   // Auto-scroll to bottom of messages
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Test connection and model loading status
//   useEffect(() => {
//     const checkServerStatus = async () => {
//       try {
//         setConnectionStatus('connecting');
        
//         // First check if server is up
//         const pingResponse = await fetch(RASA_SERVER_URL, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ sender: senderId, message: "ping" })
//         });
        
//         if (!pingResponse.ok) {
//           throw new Error('Server not responding');
//         }

//         // Then check if model is loaded (simulate with a simple message)
//         const modelCheckResponse = await fetch(RASA_SERVER_URL, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ sender: senderId, message: "hello" })
//         });

//         if (!modelCheckResponse.ok) {
//           throw new Error('Model not ready');
//         }

//         const modelData = await modelCheckResponse.json();
//         if (!modelData || modelData.length === 0) {
//           throw new Error('Model returned empty response');
//         }

//         setConnectionStatus('connected');
//         setModelLoading(false);
//       } catch (error) {
//         console.error('Connection check failed:', error);
//         setConnectionStatus('disconnected');
        
//         // Retry after 5 seconds if model is still loading
//         if (error.message.includes('Model not ready')) {
//           setTimeout(checkServerStatus, 5000);
//         }
//       }
//     };

//     checkServerStatus();

//     // Cleanup function
//     return () => {
//       setConnectionStatus('disconnected');
//     };
//   }, [senderId]);

//   const sendMessageToRasa = async (message) => {
//     if (modelLoading) {
//       addBotMessage("The chatbot is still loading. Please wait a moment...");
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       const response = await fetch(RASA_SERVER_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           sender: senderId,
//           message: message
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Server responded with ${response.status}`);
//       }

//       const data = await response.json();
      
//       if (!data || !Array.isArray(data)) {
//         throw new Error('Invalid response format');
//       }

//       // Handle all responses from Rasa
//       data.forEach((response) => {
//         if (response.text) {
//           addBotMessage(response.text);
//         }
//         // Handle other response types like buttons, images etc.
//         if (response.buttons) {
//           response.buttons.forEach(button => {
//             addBotMessage(`[Button] ${button.title}`);
//           });
//         }
//       });

//     } catch (error) {
//       console.error('Rasa communication error:', error);
      
//       if (error.message.includes('Failed to fetch')) {
//         setConnectionStatus('disconnected');
//         addBotMessage("I'm having trouble connecting to the server. Trying to reconnect...");
//         // Attempt to reconnect
//         setTimeout(() => {
//           sendMessageToRasa(message);
//         }, 3000);
//       } else {
//         addBotMessage("Sorry, I encountered an error processing your request. Please try again.");
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const addUserMessage = (text) => {
//     const newMessage = {
//       text,
//       sender: 'user',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     setMessages(prev => [...prev, newMessage]);
//   };

//   const addBotMessage = (text) => {
//     const botMessage = {
//       text,
//       sender: 'bot',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     setMessages(prev => [...prev, botMessage]);
//   };

//   const handleSend = () => {
//     if (inputValue.trim() && !isLoading) {
//       addUserMessage(inputValue);
//       setInputValue('');
//       sendMessageToRasa(inputValue);
//     }
//   };

//   const handleQuickReply = (quickReply) => {
//     addUserMessage(quickReply);
//     sendMessageToRasa(quickReply);
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   return (
//     <div className="chatbot-container">
//       <div className="chatbot-header">
//         <h2>Customer Support</h2>
//         <div className={`connection-status ${connectionStatus}`}>
//           {connectionStatus === 'connected' ? 'Online' : 'Offline'}
//           {modelLoading && connectionStatus === 'connected' && ' (Model Loading...)'}
//         </div>
//       </div>

//       <div className="chatbot-messages">
//         {messages.length === 0 ? (
//           <div className="empty-state">
//             <p>How can I help you today?</p>
//             {connectionStatus === 'connected' && !modelLoading && (
//               <div className="quick-replies">
//                 <button onClick={() => handleQuickReply('Hello')}>Say Hello</button>
//                 <button onClick={() => handleQuickReply('Help')}>Get Help</button>
//                 <button onClick={() => handleQuickReply('What can you do?')}>Features</button>
//               </div>
//             )}
//             {modelLoading && (
//               <p className="model-loading">The AI model is still loading. Please wait...</p>
//             )}
//             {connectionStatus === 'disconnected' && (
//               <p className="connection-error">Connecting to chatbot service...</p>
//             )}
//           </div>
//         ) : (
//           messages.map((msg, index) => (
//             <div key={index} className={`message ${msg.sender}`}>
//               <div className="message-content">
//                 <p>{msg.text}</p>
//                 <span className="message-time">{msg.time}</span>
//               </div>
//             </div>
//           ))
//         )}
//         {isLoading && (
//           <div className="message bot">
//             <div className="message-content typing-indicator">
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           </div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>

//       <div className="chatbot-input-area">
//         <input
//           type="text"
//           value={inputValue}
//           placeholder={
//             modelLoading ? "Model loading..." :
//             connectionStatus !== 'connected' ? "Connecting..." :
//             isLoading ? "Please wait..." : 
//             "Type your message..."
//           }
//           onChange={(e) => setInputValue(e.target.value)}
//           onKeyPress={handleKeyPress}
//           disabled={isLoading || connectionStatus !== 'connected' || modelLoading}
//         />
//         <button 
//           onClick={handleSend} 
//           disabled={isLoading || !inputValue.trim() || connectionStatus !== 'connected' || modelLoading}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatbotPage;



























import React, { useState, useEffect, useRef } from 'react';
import './ChatbotPage.css';
import { useTranslation } from "react-i18next"; // <-- added this import

const ChatbotPage = () => {


  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const [modelLoading, setModelLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Rasa server configuration
  const RASA_SERVER_URL = 'http://localhost:5005/webhooks/rest/webhook';
  const [senderId] = useState('user_' + Math.random().toString(36).substr(2, 9));

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Test connection and model loading status
  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        setConnectionStatus('connecting');
        
        const pingResponse = await fetch(RASA_SERVER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender: senderId, message: "ping" })
        });
        
        if (!pingResponse.ok) throw new Error('Server not responding');

        const modelCheckResponse = await fetch(RASA_SERVER_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sender: senderId, message: "hello" })
        });

        if (!modelCheckResponse.ok) throw new Error('Model not ready');

        const modelData = await modelCheckResponse.json();
        if (!modelData || modelData.length === 0) throw new Error('Model returned empty response');

        setConnectionStatus('connected');
        setModelLoading(false);
      } catch (error) {
        console.error('Connection check failed:', error);
        setConnectionStatus('disconnected');
        
        if (error.message.includes('Model not ready')) {
          setTimeout(checkServerStatus, 5000);
        }
      }
    };

    checkServerStatus();

    return () => {
      setConnectionStatus('disconnected');
    };
  }, [senderId]);

  const sendMessageToRasa = async (message) => {
    if (modelLoading) {
      addBotMessage("The chatbot is still loading. Please wait a moment...");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch(RASA_SERVER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender: senderId, message: message }),
      });

      if (!response.ok) throw new Error(`Server responded with ${response.status}`);

      const data = await response.json();
      
      if (!data || !Array.isArray(data)) throw new Error('Invalid response format');

      data.forEach((response) => {
        if (response.text) addBotMessage(response.text);
        if (response.buttons) {
          response.buttons.forEach(button => {
            addBotMessage(`[Button] ${button.title}`);
          });
        }
      });

    } catch (error) {
      console.error('Rasa communication error:', error);
      
      if (error.message.includes('Failed to fetch')) {
        setConnectionStatus('disconnected');
        addBotMessage("I'm having trouble connecting to the server. Trying to reconnect...");
        setTimeout(() => sendMessageToRasa(message), 3000);
      } else {
        addBotMessage("Sorry, I encountered an error processing your request. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, {
      text,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, {
      text,
      sender: 'bot',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  const handleSend = () => {
    if (inputValue.trim() && !isLoading) {
      addUserMessage(inputValue);
      setInputValue('');
      sendMessageToRasa(inputValue);
    }
  };

  const handleQuickReply = (quickReply) => {
    addUserMessage(quickReply);
    sendMessageToRasa(quickReply);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="listof-chatbot-container">
      <div className="listof-chatbot-header">
        <h2 className="listof-chatbot-title">{t(`Customer Support`)}</h2>
        <div className={`listof-connection-status listof-${connectionStatus}`}>
          {connectionStatus === 'connected' ? <>{t(`Online`)}</> : <>{t(`Offline`)}</>}
          {modelLoading && connectionStatus === 'connected' && ' (Model Loading...)'}
        </div>
      </div>

      <div className="listof-chatbot-messages">
        {messages.length === 0 ? (
          <div className="listof-empty-state">
            <p className="listof-empty-message">{t(`How can I help you today?`)}</p>
            {connectionStatus === 'connected' && !modelLoading && (
              <div className="listof-quick-replies">
                <button 
                  className="listof-quick-reply-btn"
                  onClick={() => handleQuickReply('Hello')}
                >
                  {t(`Say Hello`)}
                </button>
                <button 
                  className="listof-quick-reply-btn"
                  onClick={() => handleQuickReply('Help')}
                >
                  {t(`Get Help`)}
                </button>
                <button 
                  className="listof-quick-reply-btn"
                  onClick={() => handleQuickReply('What can you do?')}
                >
                  {t(`Features`)}
                </button>
              </div>
            )}
            {modelLoading && (
              <p className="listof-model-loading">{t(`The AI model is still loading. Please wait...`)}</p>
            )}
            {connectionStatus === 'disconnected' && (
              <p className="listof-connection-error">{t(`Connecting to chatbot service...`)}</p>
            )}
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className={`listof-message listof-${msg.sender}`}>
              <div className="listof-message-content">
                <p className="listof-message-text">{msg.text}</p>
                <span className="listof-message-time">{msg.time}</span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="listof-message listof-bot">
            <div className="listof-message-content listof-typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="listof-chatbot-input-area">
        {/* <input
          type="text"
          className="listof-chatbot-input"
          value={inputValue}
          placeholder={
            modelLoading ?  {t(`Model loading...`)}:
            connectionStatus !== <>{t('connected')}</> ? <>{t("Connecting...")}</> :
            isLoading ? <>{t("Please wait...")}</> : <>{t(`Type your message...`)}</>
          }
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || connectionStatus !== 'connected' || modelLoading}
        /> */}
        <input
  type="text"
  className="listof-chatbot-input"
  value={inputValue}
  placeholder={
    modelLoading
      ? t("Model loading...")
      : connectionStatus !== "connected"
      ? t("Connecting...")
      : isLoading
      ? t("Please wait...")
      : t("Type your message...")
  }
  onChange={(e) => setInputValue(e.target.value)}
  onKeyPress={handleKeyPress}
  disabled={isLoading || connectionStatus !== "connected" || modelLoading}
/>

        <button 
          className="listof-chatbot-send-btn"
          onClick={handleSend} 
          disabled={isLoading || !inputValue.trim() || connectionStatus !== 'connected' || modelLoading}
        >
          {isLoading ? (
            <span className="listof-send-btn-loader"></span>
          ) : (
            <span>{t(`Send`)}</span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatbotPage;