// import React, { useState } from 'react';
// import './ContactPage.css';
// import SendUsMessage from './SendUsMessage';

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     message: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ success: null, message: '' });


//   return (
//     <div className="contact-page">
//       {/* Hero Section */}
//       <div className="contact-hero">
//         <h1>Connect With Us</h1>
//         <p>We're here to help you find your dream property</p>
//       </div>

//       {/* Main Content */}
//       <SendUsMessage/>
//     </div>
//   );
// };

// export default ContactPage;











// ContactPage.jsx
import React from 'react';
import './ContactPage.css';
import SendUsMessage from './SendUsMessage';
import { useTranslation } from "react-i18next"; // <-- added this import

const ContactPage = () => {


    const { t, i18n } = useTranslation();
      
        const changeLanguage = (lng) => {
          i18n.changeLanguage(lng);
        };
  return (
    <div className="listof-contact-page">
      {/* Hero Section */}
      <section className="listof-contact-hero">
        <div className="listof-hero-content">
          <h1 className="listof-hero-title">{t(`Connect With Us`)}</h1>
          <p className="listof-hero-subtitle">{t(`We're here to help you find your dream property`)}</p>
        </div>
      </section>

      {/* Main Content */}
      <SendUsMessage />
    </div>
  );
};

export default ContactPage;