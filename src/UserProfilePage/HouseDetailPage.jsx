import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './HouseDetailPage.css';
import ContactOwner from '../contactowner/ContactOwner';
import Pay from '../chapa/Pay';
import { useTranslation } from 'react-i18next';

const HouseDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [txRef, setTxRef] = useState(''); // For transaction reference

   const {t,i18n}=useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/house/${id}`);
        setHouse(response.data.data);
      } catch (err) {
        console.error('Error fetching house details:', err);
        setError('Failed to load house details.');
      } finally {
        setLoading(false);
      }
    };
    generateTxRef();

    fetchHouseDetails();
  }, [id]);
  const generateTxRef = () => {
    // Example: chapa_tx_ + current timestamp + random 4-digit number
    const ref = 'chapa_tx_' + Date.now() + '_' + Math.floor(1000 + Math.random() * 9000);
    setTxRef(ref);
  };

  if (loading) {
    return <div className="loading">{t(`Loading house details...`)}</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!house) {
    return <div className="not-found">{t(`House not found`)}</div>;
  }

  return (
    <div className="house-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &larr; {t(`Back to Listings`)}
      </button>

      <div className="house-header">
        <h1>{house.title}</h1>
        <div className="price-tag">
  ${house.price} {house.ForSellRent === 'Rent' ? `/${t("month")}` : ''}
</div>
      </div>

      <div className="house-gallery">
        <div className="main-image">
          <img 
            src={`${process.env.REACT_APP_API_URL}/uploads${house.cover_image}`} 
            alt={house.title} 
          />
        </div>
      </div>

      <div className="house-details">
        <div className="details-section">
          <h2>{t(`Description`)}</h2>
          <p>{house.description}</p>
        </div>

        <div className="details-section">
          <h2>{t(`Property Details`)}</h2>
          <div className="property-grid">
            <div className="property-item">
              <span className="property-label">Bedrooms:</span>
              <span className="property-value">{house.bedrooms}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Bathrooms:</span>
              <span className="property-value">{house.bathrooms}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Area:</span>
              <span className="property-value">{house.area} sq ft</span>
            </div>
            <div className="property-item">
              <span className="property-label">Property Type:</span>
              <span className="property-value">{house.propertyType}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Listing Type:</span>
              <span className="property-value">{house.ForSellRent}</span>
            </div>
            <div className="property-item">
              <span className="property-label">Status:</span>
              <span className="property-value">{house.status}</span>
            </div>
          </div>
        </div>

        <div className="details-section">
          <h2>{t(`Location`)}</h2>
          <p>{house.address}, {house.location}</p>
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
          amount={house.price}
          tx_ref={txRef} 
          propertyId={id}
          propertyType={"house"}
listingtype={house.ForSellRent}

        />
      </div>

      <div className="contact-section">
        {/* <Link to='/ContactOwner'> */}
        {/* <button className="contact-button">Contact Now</button> */}
        {/* ContactOwner */}
        <ContactOwner listingId={house.id} contactType="house" />
        {/* </Link> */}
        {/* <h2>Contact Seller</h2> */}
       
      </div>
    </div>
  );
};

export default HouseDetailPage;