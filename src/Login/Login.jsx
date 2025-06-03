
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/authContext.js';
// import axios from 'axios';
// import './Login.css'
// import { useTranslation } from 'react-i18next';

// function Login() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [credentials, setCredentials] = useState({
//     email: '',
//     password: ''
//   });
//   const [error, setError] = useState('');
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');
    
//     try {
//       const response = await axios.post(
//         `${process.env.REACT_APP_API_URL}/api/auth/login`, 
//         credentials
//       );
//       login(response.data.user);
//       navigate('/');
//     } catch (err) {
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const {t,i18n}=useTranslation();
//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h1>{t("Welcome Back")}</h1>
//         <p>{t("Sign in to access your account")}</p>

//         {error && <div className="alert error">{error}</div>}

//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>{t("Email")}</label>
//             <input
//               type="email"
//               name="email"
//               value={credentials.email}
//               onChange={handleChange}
//               placeholder="your@email.com"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className="form-group">
//             <label>{t("Password")}</label>
//             <input
//               type="password"
//               name="password"
//               value={credentials.password}
//               onChange={handleChange}
//               placeholder="••••••••"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <button 
//             type="submit" 
//             className="submit-btn"
//             disabled={isLoading}
//           >
//             {isLoading ? <>{t('Signing In...')}</> : <>{t('Sign In')}</>}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Login;







import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext.js";
import axios from "axios";
import { useTranslation } from "react-i18next"; // <-- added this import
import "./Login.css";
import Footer from "../HomePage/Footer.jsx";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation(); // fixed typo here

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        credentials
      );
      login(response.data.user);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h1>{t("Welcome Back")}</h1>
          <p>{t("Sign in to access your account")}</p>

          {error && <div className="alert error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>{t("Email")}</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group">
              <label>{t("Password")}</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                disabled={isLoading}
              />
            </div>

            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? t("Signing In...") : t("Sign In")}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
