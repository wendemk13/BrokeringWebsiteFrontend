import React from 'react';
import './PropertyCard.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function PropertyCard({ 
  id,
  title,
  description,
  price,
  location,
  address,
  bedrooms,
  bathrooms,
  area,
  propertyType,
  status,
  cover_image,
  ForSellRent,
  imageUrl
}) {


   const { t, i18n } = useTranslation();
      
        const changeLanguage = (lng) => {
          i18n.changeLanguage(lng);
        };
  return (
    <div className="listof-property-card">
      <div className="listof-property-image-container">
        <img 
          src={imageUrl || cover_image} 
          alt={title} 
          className="listof-property-img" 
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
       
        {ForSellRent && (
          <span className="listof-property-tag">
            {ForSellRent === 'Rent' ? <>{t('For Rent')}</> : <>{t('For Sale')}</>}
          </span>
        )}
      </div>

      <div className="listof-property-content">
        <h3 className="listof-property-title">{title}</h3>
        <div className="listof-property-price">
          ${price.toLocaleString()} {ForSellRent === 'Rent' ? '/month' : ''}
        </div>
        <div className="listof-property-address">
          {address}, {location}
        </div>
        <div className="listof-property-features">
          <div className="listof-property-feature">
            <i className="fas fa-bed listof-property-icon"></i> 
            <span className="listof-property-feature-value">{bedrooms}</span>
            <span className="listof-property-feature-label">Beds</span>
          </div>
          <div className="listof-property-feature">
            <i className="fas fa-bath listof-property-icon"></i> 
            <span className="listof-property-feature-value">{bathrooms}</span>
            <span className="listof-property-feature-label">Baths</span>
          </div>
          <div className="listof-property-feature">
            <i className="fas fa-ruler-combined listof-property-icon"></i> 
            <span className="listof-property-feature-value">{area}</span>
            <span className="listof-property-feature-label">sqft</span>
          </div>
        </div>
        <div className="listof-property-footer">
          <Link 
            to={`/houses/${id}`} 
            className="listof-btn listof-btn-outline"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;