import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './FeaturedHouses.css';
import { useTranslation } from 'react-i18next';

function FeaturedHouses() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

   const {t,i18n}=useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/house`);
        if (response.data.success && response.data.data) {
          const firstThree = response.data.data.slice(0, 3);
          setProperties(firstThree);
        } else {
          setError('No houses data available');
        }
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError('Failed to load featured houses');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

 

  if (loading) return <div className="listof-loading">Loading featured houses...</div>;
  if (error) return <div className="listof-error">{error}</div>;
  if (properties.length === 0) return <div className="listof-empty">{t(`No featured houses available`)}</div>;

  return (
    <section className="listof-featured-section">
      <div className="listof-section-header">
        <h2 className="listof-section-title">{t(`Featured Houses`)}</h2>
        <p className="listof-section-subtitle">
          {t(`Discover our handpicked selection of premium houses available for sale and rent`)}
        </p>
      </div>

      <div className="listof-featured-grid">
        {properties.map((property) => (
          <div className="listof-featured-card" key={property.id}>
            <div className="listof-featured-image-container">
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads${property.cover_image}`}
                alt={property.title}
                className="listof-featured-img"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="listof-featured-badges">
                {/* <span className={`listof-status-badge ${property.status ? property.status.toLowerCase() : ''}`}>
                  {property.status || 'Available'}
                </span> */}
                <span className={`listof-type-badge ${property.ForSellRent ? property.ForSellRent.toLowerCase() : ''}`}>
                  {property.ForSellRent === 'Rent' ? <>{t('For Rent')}</> : <>{t('For Sell')}</>}
                </span>
              </div>
            </div>
            <div className="listof-featured-content">
              <h3 className="listof-featured-title">{property.title}</h3>
              <div className="listof-featured-price">
                ${property.price.toLocaleString()} {property.ForSellRent === 'Rent' ? '/month' : ''}
              </div>
              <div className="listof-featured-address">
                {property.address}, {property.location}
              </div>
              <div className="listof-featured-features">
                <div className="listof-featured-feature">
                  <i className="fas fa-bed listof-featured-icon"></i> 
                  <span>{property.bedrooms} Beds</span>
                </div>
                <div className="listof-featured-feature">
                  <i className="fas fa-bath listof-featured-icon"></i> 
                  <span>{property.bathrooms} Baths</span>
                </div>
                <div className="listof-featured-feature">
                  <i className="fas fa-ruler-combined listof-featured-icon"></i> 
                  <span>{property.area} sqft</span>
                </div>
              </div>
              <div className="listof-featured-footer">
                {/* <div className="listof-featured-type">{property.propertyType}</div> */}
                <Link 
                  to={`/houses/${property.id}`} 
                  className="listof-btn listof-btn-outline"
                >
                  {t(`View Details`)}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="listof-featured-view-all">
        <Link to="/properties" className="listof-btn listof-btn-primary">
          {t(`View All Houses`)}
        </Link>
      </div>
    </section>
  );
}

export default FeaturedHouses;