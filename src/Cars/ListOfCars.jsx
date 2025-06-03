


import React, { useEffect, useState } from 'react';
import CarCard from './CarCard';
import './ListOfCars.css';
import axios from 'axios';
import { useTranslation } from "react-i18next"; // <-- added this import
import Footer from '../HomePage/Footer';

function ListOfCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


 const { t, i18n } = useTranslation();
  
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/car`);
        if (response.data.cars) {
          setCars(response.data.cars);
        } else {
          setError('No cars data found');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Error loading cars. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);



  if (loading) return <div className="listof-loading">{t(`Loading cars...`)}</div>;
  if (error) return <div className="listof-error">{error}</div>;
  if (cars.length === 0) return <div className="listof-empty">{t(`No cars available at the moment.`)}</div>;

  return (
    <div>
      <section
        className="listof-section"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="listof-section-header">
          <h2 className="listof-section-title">
            {t(`List of All Available Cars`)}
          </h2>
          {/* <p className="listof-section-subtitle">Browse all vehicles available</p> */}
        </div>

        <div className="listof-car-grid">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              id={car.id}
              title={`${car.make} ${car.model} (${car.year})`}
              price={car.price}
              mileage={car.mileage}
              fuel={car.fuel_type || "N/A"}
              transmission={car.transmission}
              color={car.color}
              status={car.status}
              imageUrl={
                car.cover_image
                  ? `${process.env.REACT_APP_API_URL}/uploads${car.cover_image}`
                  : "https://via.placeholder.com/300x200?text=No+Image"
              }
              ForSellRent={car.ForSellRent}
              approvalStatus={car.approval_status}
            />
          ))}
        </div>

        {/* <div className="listof-view-all">
        <button onClick={handleViewAll} className="listof-btn listof-btn-primary">
          View All Vehicles
        </button>
      </div> */}
      </section>
      <Footer />
    </div>
  );
}

export default ListOfCars;