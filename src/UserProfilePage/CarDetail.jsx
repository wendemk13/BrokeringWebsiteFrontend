import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CarDetailPage.css'; // You can create a similar CSS file as HouseDetailPage
import ContactOwner from '../contactowner/ContactOwner';
import Pay from '../chapa/Pay';
import { useTranslation } from "react-i18next"; // <-- added this import

const CarDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [txRef, setTxRef] = useState(''); // For transaction reference

  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {

    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/car/${id}`);
        setCar(response.data.car);
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('Failed to load car details.');
      } finally {
        setLoading(false);
      }
    };
    generateTxRef();

    fetchCarDetails();
  }, [id]);
  const generateTxRef = () => {
    // Example: chapa_tx_ + current timestamp + random 4-digit number
    const ref = 'chapa_tx_' + Date.now() + '_' + Math.floor(1000 + Math.random() * 9000);
    setTxRef(ref);
  };

  if (loading) {
    return <div className="loading">{t(`Loading car details...`)}</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!car) {
    return <div className="not-found">{t(`Car not found`)}</div>;
  }
 

  return (
    <div className="car-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; {t(`Back to Listings`)}
      </button>

      <div className="car-header">
        <h1>{car.title}</h1>
        <div className="price-tag">${car.price} {car.ForSellRent === 'rent' ? '/month' : ''}</div>
      </div>

      {car.cover_image && (
        <div className="car-gallery">
          <div className="main-image">
            <img 
              src={`${process.env.REACT_APP_API_URL}/uploads${car.cover_image}`} 
              alt={car.title} 
            />
          </div>
        </div>
      )}

      <div className="car-details">
        <div className="details-section">
          <h2>{t(`Description`)}</h2>
          <p>{car.description}</p>
        </div>

        <div className="details-section">
          <h2>{t(`Vehicle Details`)}</h2>
          <div className="property-grid">
            <div className="property-item">
              <span className="property-label">Make:</span>
              <span className="property-value">{car.make}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Model:</span>
              <span className="property-value">{car.model}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Year:</span>
              <span className="property-value">{car.year}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Mileage:</span>
              <span className="property-value">{car.mileage.toLocaleString()} miles</span>
            </div>
            <div className="property-item">
              <span className="property-label">Color:</span>
              <span className="property-value">{car.color}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Transmission:</span>
              <span className="property-value">{car.transmission}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Fuel Type:</span>
              <span className="property-value">{car.fuel_type}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Listing Type:</span>
              <span className="property-value">{car.ForSellRent}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Status:</span>
              <span className="property-value">{car.status}</span>
            </div>
          </div>
        </div>
      </div>
      <div >
        {/* <Link to='/ChapaPaymentForm' firstname={"wende"} lastname={"melake"} email={"wendemk13@gmail.com"} >Payment
        </Link> */}
         <Pay
          className="submit-btn"
          fname={"wende"}
          lname={"melake"}
          email={"wendemk13@gmail.com"}
          amount={car.price}
          tx_ref={txRef} 
          propertyId={id}
          propertyType={"car"}
          listingtype={car.ForSellRent}
        />
      </div>
      <div className="contact-section">
        {/* <h2>Contact Seller</h2>
        <button className="contact-button">Contact Now</button> */}
        <ContactOwner listingId={car.id} contactType="car" />

      </div>
    </div>
  );
};

export default CarDetail;