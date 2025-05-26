import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import './PendingHouseDetail.css';
import axios from 'axios';

function PendingHouseDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const house = state?.house;

  const handleApprove = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/approval/approveHouse/${house.id}`);
      navigate(-1); // Go back to previous page after approval
    } catch (err) {
      console.error('Error approving house:', err);
      // You might want to show an error message to the user here
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/approval/house/${house.id}/reject`);
      navigate(-1); // Go back to previous page after rejection
    } catch (err) {
      console.error('Error rejecting house:', err);
      // You might want to show an error message to the user here
    }
  };

  if (!house) {
    return (
      <div className="house-detail-error">
        No house data found. Please go back and try again.
        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
          style={{ marginTop: '20px' }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to List
        </button>
      </div>
    );
  }

  return (
    <div className="house-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to List
      </button>

      <div className="house-detail-header">
        <h1>{house.title}</h1>
        <div className="price">${house.price.toLocaleString()}</div>
      </div>

      <div className="house-image-container">
        <img 
          src={`${process.env.REACT_APP_API_URL}/uploads${house.cover_image}` || '/placeholder-house.jpg'} 
          alt={house.title} 
          className="house-main-image"
          onError={(e) => {
            e.target.src = '/placeholder-house.jpg';
          }}
        />
      </div>

      <div className="house-details">
        <div className="specs">
          <div className="spec-item">
            <span className="spec-label">Bedrooms:</span>
            <span className="spec-value">{house.bedrooms}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Bathrooms:</span>
            <span className="spec-value">{house.bathrooms}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Area:</span>
            <span className="spec-value">{house.area.toLocaleString()} sqft</span>
          </div>
        </div>

        <div className="description">
          <h3>Description</h3>
          <p>{house.description || 'No description provided'}</p>
        </div>

        <div className="additional-details">
          {house.address && (
            <div className="detail-item">
              <h4>Address</h4>
              <p>{house.address}</p>
            </div>
          )}
          {house.features && house.features.length > 0 && (
            <div className="detail-item">
              <h4>Features</h4>
              <ul className="features-list">
                {house.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="actions">
          <button 
            className="action-btn reject-btn"
            onClick={handleReject}
          >
            <FontAwesomeIcon icon={faTimes} />
            Reject
          </button>
          <button 
            className="action-btn approve-btn"
            onClick={handleApprove}
          >
            <FontAwesomeIcon icon={faCheck} />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default PendingHouseDetail;