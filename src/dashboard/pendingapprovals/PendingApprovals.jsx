import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faHome, faCar, faClock } from '@fortawesome/free-solid-svg-icons';
import './PendingApprovals.css';
import { useNavigate } from 'react-router-dom';

const PendingApprovals = () => {
  const [pendingListings, setPendingListings] = useState({
    pendingCars: [],
    pendingHouses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Handle navigation to detail pages
  const handleItemClick = (item, type) => {
    navigate(`/pending${type.toLowerCase()}detail`, { 
      state: { 
        [type.toLowerCase()]: item,
        type: type // Pass the type as well for consistency
      } 
    });
  };

  useEffect(() => {
    const fetchPendingListings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/approval/getPendingListings`);
        setPendingListings({
          pendingHouses: response.data.pendingHouses,
          pendingCars: response.data.pendingCars
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPendingListings();
  }, []);

  const handleApprove = async (id, type) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/approval/approve${type}/${id}`);
      setPendingListings(prev => ({
        pendingCars: type === 'Car' ? prev.pendingCars.filter(item => item.id !== id) : prev.pendingCars,
        pendingHouses: type === 'House' ? prev.pendingHouses.filter(item => item.id !== id) : prev.pendingHouses
      }));
    } catch (err) {
      console.error(`Error approving ${type}:`, err);
    }
  };

  const handleReject = async (id, type) => {
    try {
      const endpoint = `${process.env.REACT_APP_API_URL}/api/approval/${type.toLowerCase()}/${id}/reject`;
      console.log('Making rejection request to:', endpoint);
      
      const response = await axios.put(endpoint);
      console.log('Rejection successful:', response.data);
      
      setPendingListings(prev => ({
        pendingCars: type === 'Car' ? prev.pendingCars.filter(item => item.id !== id) : prev.pendingCars,
        pendingHouses: type === 'House' ? prev.pendingHouses.filter(item => item.id !== id) : prev.pendingHouses
      }));
    } catch (err) {
      console.error('Rejection failed:', {
        url: err.config?.url,
        status: err.response?.status,
        error: err.response?.data || err.message
      });
    }
  };

  if (loading) return (
    <div className="admin-approval-loading">
      <FontAwesomeIcon icon={faClock} spin />
      <span>Loading pending listings...</span>
    </div>
  );

  if (error) return (
    <div className="admin-approval-error">
      Error: {error}
    </div>
  );

  return (
    <div className="admin-approval-card">
      <div className="admin-approval-header">
        <h3 className="admin-approval-title">Recent Approval Requests</h3>
        <span className="admin-approval-count">
          {pendingListings.pendingHouses.length + pendingListings.pendingCars.length} pending
        </span>
      </div>

      <div className="admin-approval-list">
        {pendingListings.pendingHouses.length === 0 && pendingListings.pendingCars.length === 0 ? (
          <div className="admin-approval-empty">
            No pending approval requests
          </div>
        ) : (
          <>
            {pendingListings.pendingHouses.map(house => (
              <div 
                className="admin-approval-item" 
                key={`house-${house.id}`}
                onClick={() => handleItemClick(house, 'House')}
                style={{ cursor: 'pointer' }}
              >
                <div className="admin-approval-image-container">
                  <img 
                    src={`${process.env.REACT_APP_API_URL}/uploads${house.cover_image}` || '/placeholder-house.jpg'} 
                    alt="House" 
                    className="admin-approval-image" 
                  />
                  <span className="admin-approval-badge admin-approval-badge-house">
                    <FontAwesomeIcon icon={faHome} />
                  </span>
                </div>
                <div className="admin-approval-details">
                  <h4 className="admin-approval-item-title">{house.title}</h4>
                  <div className="admin-approval-meta">
                    <span className="admin-approval-price">${house.price}</span>
                    <span className="admin-approval-specs">
                      {house.bedrooms} bed • {house.bathrooms} bath • {house.area} sqft
                    </span>
                  </div>
                </div>
                <div 
                  className="admin-approval-actions" 
                  onClick={(e) => e.stopPropagation()} // Prevent click propagation to parent
                >
                  <button 
                    className="admin-approval-btn admin-approval-btn-approve"
                    onClick={() => handleApprove(house.id, 'House')}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Approve</span>
                  </button>
                  <button 
                    className="admin-approval-btn admin-approval-btn-reject"
                    onClick={() => handleReject(house.id, 'House')}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}

            {pendingListings.pendingCars.map(car => (
              <div 
                className="admin-approval-item" 
                key={`car-${car.id}`}
                onClick={() => handleItemClick(car, 'Car')}
                style={{ cursor: 'pointer' }}
              >
                <div className="admin-approval-image-container">
                  <img 
                    src={`${process.env.REACT_APP_API_URL}/uploads${car.cover_image}` || '/placeholder-car.jpg'} 
                    alt="Car" 
                    className="admin-approval-image" 
                  />
                  <span className="admin-approval-badge admin-approval-badge-car">
                    <FontAwesomeIcon icon={faCar} />
                  </span>
                </div>
                <div className="admin-approval-details">
                  <h4 className="admin-approval-item-title">{car.title}</h4>
                  <div className="admin-approval-meta">
                    <span className="admin-approval-price">${car.price}</span>
                    <span className="admin-approval-specs">
                      {car.year} {car.make} {car.model}
                    </span>
                  </div>
                </div>
                <div 
                  className="admin-approval-actions" 
                  onClick={(e) => e.stopPropagation()} // Prevent click propagation to parent
                >
                  <button 
                    className="admin-approval-btn admin-approval-btn-approve"
                    onClick={() => handleApprove(car.id, 'Car')}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <span>Approve</span>
                  </button>
                  <button 
                    className="admin-approval-btn admin-approval-btn-reject"
                    onClick={() => handleReject(car.id, 'Car')}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default PendingApprovals;