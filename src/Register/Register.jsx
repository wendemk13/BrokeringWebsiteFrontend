import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { useTranslation } from "react-i18next"; // <-- added this import
import Footer from "../HomePage/Footer";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "customer",
    profile_image: null,
  });
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.password.trim()) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setApiError("");

    try {
      const data = new FormData();
      data.append("first_name", formData.first_name);
      data.append("last_name", formData.last_name);
      data.append("username", formData.username);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("role", formData.role);
      if (formData.profile_image) {
        data.append("profile_image", formData.profile_image);
      }

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201 || res.status === 200) {
        navigate("/login");
      }
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setApiError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register-card">
          <div className="register-header">
            <h1>{t(`Create an Account`)}</h1>
            <p>{t(`Join our platform today`)}</p>
          </div>

          {apiError && (
            <div className="alert error">
              <strong>Registration Error:</strong> {apiError}
              <p>Please check your details and try again</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group profile-image-group">
              <label>{t(`Profile Image (optional)`)}</label>
              <div className="file-input-wrapper">
                <input
                  type="file"
                  id="profile_image"
                  name="profile_image"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      profile_image: e.target.files[0],
                    }))
                  }
                />
                <label htmlFor="profile_image" className="file-input-label">
                  {formData.profile_image ? (
                    formData.profile_image.name
                  ) : (
                    <>{t(`Choose an image...`)}</>
                  )}
                </label>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="first_name">{t(`First Name*`)}</label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={errors.first_name ? "error" : ""}
                  placeholder={t("Enter your first name")}
                />
                {errors.first_name && (
                  <span className="error-message">{errors.first_name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="last_name">{t(`Last Name*`)}</label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={errors.last_name ? "error" : ""}
                  placeholder={t("Enter your last name")}
                />
                {errors.last_name && (
                  <span className="error-message">{errors.last_name}</span>
                )}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="username">{t(`Username*`)}</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "error" : ""}
                placeholder={t("Enter username")}
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="email">{t(`Email*`)}</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                placeholder={t("Enter your email")}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">{t(`Password*`)}</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "error" : ""}
                  placeholder={t("Create a password")}
                />
                {errors.password && (
                  <span className="error-message">{errors.password}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  {t(`Confirm Password*`)}
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={errors.confirmPassword ? "error" : ""}
                  placeholder={t("Confirm your password")}
                />
                {errors.confirmPassword && (
                  <span className="error-message">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input type="checkbox" required className="checkbox-input" />
                <span className="checkbox-custom"></span>
                <Link to="/terms"> {t(`I agree to the terms.`)}</Link>
              </label>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registering..." : "Register Now"}
            </button>

            <div className="login-redirect">
              {t(`Already have an account?`)}{" "}
              <Link to="/login" className="login-link">
                {t(`Log in here`)}
              </Link>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
