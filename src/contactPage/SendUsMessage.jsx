// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import './SendUsMessage.css'
// function SendUsMessage() {
//   const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState(null);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmitStatus(null);

//     try {
//       const user = JSON.parse(localStorage.getItem('user'));
//       const user_id = user?.id || null;

//       await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback/sendfeedback`, {
//         ...formData,
//         user_id
//       });

//       setSubmitStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
//       setFormData({ name: '', email: '', phone: '', message: '' });
//     } catch (err) {
//       console.error(err);
//       const message = err.response?.data?.message || 'Failed to send message.';
//       setSubmitStatus({ type: 'error', message });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <div className="contact-container">
//       <form onSubmit={handleSubmit} className="contact-form">
//         <h2>Send Us a Message</h2>

//         {submitStatus && (
//           <div className={`submit-status ${submitStatus.type}`}>
//             {submitStatus.message}
//           </div>
//         )}

//         <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
//         <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} />
//         <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required />

//         <button type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Sending...' : 'Send Message'}
//         </button>
//       </form>

//       {/* Contact Info & Socials */}
//       <div className="contact-methods-wrapper">
//         <div className="contact-methods">
//           <div className="contact-card">
//             <FaPhone />
//             <h3>Call Us</h3>
//             <p>+251 912 345 678</p>
//           </div>
//           <div className="contact-card">
//             <FaEnvelope />
//             <h3>Email</h3>
//             <p>info@betgebeya.com</p>
//           </div>
//           <div className="contact-card">
//             <FaMapMarkerAlt />
//             <h3>Visit</h3>
//             <p>Bole Road, Addis Ababa</p>
//           </div>
//         </div>

//         <div className="social-section">
//           <h3>Connect</h3>
//           <div className="social-icons">
//             <Link href="https://facebook.com/betgebeya" target="_blank" rel="noopener noreferrer"><FaFacebook /></Link>
//             <Link href="https://twitter.com/betgebeya" target="_blank" rel="noopener noreferrer"><FaTwitter /></Link>
//             <Link href="https://instagram.com/betgebeya" target="_blank" rel="noopener noreferrer"><FaInstagram /></Link>
//             <Link href="https://linkedin.com/company/betgebeya" target="_blank" rel="noopener noreferrer"><FaLinkedin /></Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SendUsMessage;










// SendUsMessage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './SendUsMessage.css';
import { useTranslation } from 'react-i18next';

function SendUsMessage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const user_id = user?.id || null;

      await axios.post(`${process.env.REACT_APP_API_URL}/api/feedback/sendfeedback`, {
        ...formData,
        user_id
      });

      setSubmitStatus({ type: 'success', message: 'Thank you! We will get back to you soon.' });
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.message || 'Failed to send message.';
      setSubmitStatus({ type: 'error', message });
    } finally {
      setIsSubmitting(false);
    }
  };

const { t, i18n } = useTranslation();   
        const changeLanguage = (lng) => {
          i18n.changeLanguage(lng);
        };

  return (
    <div className="listof-contact-container">
      <div className="listof-contact-wrapper">
        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="listof-contact-form">
          <h2 className="listof-form-title">{t(`Send Us a Message`)}</h2>

          {submitStatus && (
            <div className={`listof-submit-status listof-${submitStatus.type}`}>
              {submitStatus.message}
            </div>
          )}

          <div className="listof-form-group">
            <input 
              type="text" 
              name="name" 
              placeholder={t("Your Name")} 
              value={formData.name} 
              onChange={handleChange} 
              required 
              className="listof-form-input"
            />
          </div>

          <div className="listof-form-group">
            <input 
              type="email" 
              name="email" 
              placeholder={t("Email" )}
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="listof-form-input"
            />
          </div>

          <div className="listof-form-group">
            <input 
              type="tel" 
              name="phone" 
              placeholder={t("Phone" )}
              value={formData.phone} 
              onChange={handleChange} 
              className="listof-form-input"
            />
          </div>

          <div className="listof-form-group">
            <textarea 
              name="message" 
              placeholder={t("Your Message" )}
              rows="5" 
              value={formData.message} 
              onChange={handleChange} 
              required 
              className="listof-form-textarea"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="listof-btn listof-btn-primary"
          >
            {isSubmitting ? <>{t('Sending...')}</> :<>{t( 'Send Message')}</>}
          </button>
        </form>

        {/* Contact Info & Socials */}
        <div className="listof-contact-info">
          <div className="listof-contact-methods">
            <div className="listof-contact-card">
              <div className="listof-contact-icon">
                <FaPhone />
              </div>
              <h3 className="listof-contact-title">{t(`Call Us`)}</h3>
              <p className="listof-contact-detail">+251 912 345 678</p>
            </div>

            <div className="listof-contact-card">
              <div className="listof-contact-icon">
                <FaEnvelope />
              </div>
              <h3 className="listof-contact-title">{t(`Email`)}</h3>
              <p className="listof-contact-detail">info@betgebeya.com</p>
            </div>

            <div className="listof-contact-card">
              <div className="listof-contact-icon">
                <FaMapMarkerAlt />
              </div>
              <h3 className="listof-contact-title">{t(`Visit`)}</h3>
              <p className="listof-contact-detail">{t(`Bole Road, Addis Ababa`)}</p>
            </div>
          </div>

          <div className="listof-social-section">
            <h3 className="listof-social-title">{t(`Connect With Us`)}</h3>
            <div className="listof-social-icons">
              <Link to="#" className="listof-social-icon">
                <FaFacebook />
              </Link>
              <Link to="#" className="listof-social-icon">
                <FaTwitter />
              </Link>
              <Link to="#" className="listof-social-icon">
                <FaInstagram />
              </Link>
              <Link to="#" className="listof-social-icon">
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SendUsMessage;