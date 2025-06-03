

import React, { useEffect, useState } from 'react';
import './ListOfProperties.css';
import PropertyCard from './PropertyCard.jsx';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Footer from '../HomePage/Footer.jsx';

function ListOfProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/house`);
        if (response.data.success) {
          setProperties(response.data.data);
        } else {
          setError('Failed to fetch properties');
        }
      } catch (error) {
        console.error('Error fetching houses:', error);
        setError('Error loading properties. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);


  if (loading) return <div className="listof-loading">{t(`Loading properties...`)}</div>;
  if (error) return <div className="listof-error">{error}</div>;
  if (properties.length === 0) return <div className="listof-empty">{t(`No properties found.`)}</div>;

  return (
    <>
      <section className="listof-section">
        <div className="listof-section-header">
          <h2 className="listof-section-title">
            {t(`List of All Available  Houses`)}
          </h2>
          {/* <p className="listof-section-subtitle">Browse our premium listings</p> */}
        </div>

        <div className="listof-property-grid">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
              imageUrl={`${process.env.REACT_APP_API_URL}/uploads${property.cover_image}`}
            />
          ))}
        </div>

        {/* <div className="listof-view-all">
        <button 
          onClick={handleViewAll} 
          className="listof-btn listof-btn-primary"
        >
          View All Properties
        </button>
      </div> */}
      </section>

      <Footer />
    </>
  );
}

export default ListOfProperties;