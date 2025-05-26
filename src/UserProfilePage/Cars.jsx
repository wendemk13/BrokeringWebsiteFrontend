import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Cars.css'; // Reuse the same styles
import { useTranslation } from 'react-i18next';

function Cars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      console.error('User ID not found');
      return;
    }
    setUserId(user.id);
  }, []);
  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    if (!userId) return;

    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/usercars?userId=${userId}`);
        setCars(response.data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [userId]);

  const handleCarClick = (carId) => {
    navigate(`/cars/${carId}`);
  };

  return (
    <div className="houses-container">
      <h2>{t('Your Cars')}</h2>
      {loading ? (
        <p>{t(`Loading cars...`)}</p>
      ) : cars.length > 0 ? (
        <div className="house-grid">
          {cars.map((car) => (
            <div 
              className="house-card" 
              key={car.id || car._id}
              onClick={() => handleCarClick(car.id)}
            >
              {car.cover_image && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/uploads${car.cover_image}`}
                  className="listing-img"
                  alt={car.title}
                />
              )}
              <div className="house-info">
                <h3>{car.title}</h3>
                <p><strong>Price:</strong> ${car.price} {car.ForSellRent === 'rent' ? '/month' : ''}</p>
                <p><strong>Status:</strong> {car.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>{t(`No cars found.`)}</p>
      )}
    </div>
  );
}

export default Cars;