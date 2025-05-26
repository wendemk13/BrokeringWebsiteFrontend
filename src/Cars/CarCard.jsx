import React from 'react';
import './CarCard.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function CarCard({
  id,
  title,
  price,
  mileage,
  fuel,
  transmission,
  color,
  status,
  imageUrl,
  ForSellRent,
  approvalStatus
})

{



  const { t, i18n } = useTranslation();
    
      const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      };
  return (
    <div className="listof-car-card">
      <div className="listof-car-image-container">
        <img 
          src={imageUrl} 
          alt={title} 
          className="listof-car-img"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        {ForSellRent && (
          <span className={`listof-car-tag ${ForSellRent.toLowerCase()}`}>
            {ForSellRent === 'Rent' ? <>{t('For Rent')}</> : <>{t('For Sale')}</>}
          </span>
        )}
       
      </div>
      
      <div className="listof-car-content">
        <h3 className="listof-car-title">{title}</h3>
        <div className="listof-car-price">{price.toLocaleString()}</div>
        
        <div className="listof-car-details">
          <div className="listof-car-detail">
            <i className="fas fa-tachometer-alt listof-car-icon"></i> 
            <span className="listof-car-detail-label">Mileage:</span> 
            <span className="listof-car-detail-value">{mileage} mi</span>
          </div>
          <div className="listof-car-detail">
            <i className="fas fa-gas-pump listof-car-icon"></i> 
            <span className="listof-car-detail-label">Fuel:</span> 
            <span className="listof-car-detail-value">{fuel}</span>
          </div>
          <div className="listof-car-detail">
            <i className="fas fa-cog listof-car-icon"></i> 
            <span className="listof-car-detail-label">Transmission:</span> 
            <span className="listof-car-detail-value">{transmission}</span>
          </div>
          <div className="listof-car-detail">
            <i className="fas fa-palette listof-car-icon"></i> 
            <span className="listof-car-detail-label">Color:</span> 
            <span className="listof-car-detail-value">{color}</span>
          </div>
        </div>
        
        <div className="listof-car-footer">
          <Link 
            to={`/cars/${id}`}
            className="listof-btn listof-btn-outline"
          >
            {t(`View Details`)}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;