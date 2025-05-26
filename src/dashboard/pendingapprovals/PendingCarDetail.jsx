import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faArrowLeft, faGasPump, faCogs, faCalendarAlt, faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import './PendingCarDetail.css';
import axios from 'axios';

function PendingCarDetail() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const car = state?.car;

  const handleApprove = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/approval/approveCar/${car.id}`);
      navigate(-1); // Go back to previous page after approval
    } catch (err) {
      console.error('Error approving car:', err);
      // You might want to show an error message to the user here
    }
  };

  const handleReject = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/approval/car/${car.id}/reject`);
      navigate(-1); // Go back to previous page after rejection
    } catch (err) {
      console.error('Error rejecting car:', err);
      // You might want to show an error message to the user here
    }
  };

  if (!car) {
    return (
      <div className="car-detail-error">
        No car data found. Please go back and try again.
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
    <div className="car-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to List
      </button>

      <div className="car-detail-header">
        <h1>{car.year} {car.make} {car.model}</h1>
        <div className="price">${car.price.toLocaleString()}</div>
      </div>

      <div className="car-image-container">
        <img 
          src={`${process.env.REACT_APP_API_URL}/uploads${car.cover_image}` || '/placeholder-car.jpg'} 
          alt={`${car.year} ${car.make} ${car.model}`} 
          className="car-main-image"
          onError={(e) => {
            e.target.src = '/placeholder-car.jpg';
          }}
        />
      </div>

      <div className="car-details">
        <div className="specs-grid">
          <div className="spec-item">
            <FontAwesomeIcon icon={faCalendarAlt} className="spec-icon" />
            <div>
              <span className="spec-label">Year</span>
              <span className="spec-value">{car.year}</span>
            </div>
          </div>
          <div className="spec-item">
            <FontAwesomeIcon icon={faTachometerAlt} className="spec-icon" />
            <div>
              <span className="spec-label">Mileage</span>
              <span className="spec-value">{car.mileage?.toLocaleString() || 'N/A'} miles</span>
            </div>
          </div>
          <div className="spec-item">
            <FontAwesomeIcon icon={faGasPump} className="spec-icon" />
            <div>
              <span className="spec-label">Fuel Type</span>
              <span className="spec-value">{car.fuel_type || 'N/A'}</span>
            </div>
          </div>
          <div className="spec-item">
            <FontAwesomeIcon icon={faCogs} className="spec-icon" />
            <div>
              <span className="spec-label">Transmission</span>
              <span className="spec-value">{car.transmission || 'N/A'}</span>
            </div>
          </div>
        </div>

        <div className="description">
          <h3>Description</h3>
          <p>{car.description || 'No description provided'}</p>
        </div>

        <div className="additional-details">
          {car.color && (
            <div className="detail-item">
              <h4>Color</h4>
              <p>{car.color}</p>
            </div>
          )}
          {car.features && car.features.length > 0 && (
            <div className="detail-item">
              <h4>Features</h4>
              <ul className="features-list">
                {car.features.map((feature, index) => (
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

export default PendingCarDetail;