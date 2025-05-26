



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './FeaturedCars.css';

// function FeaturedCars() {
//   const [cars, setCars] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/car`);
//         if (response.data.cars) {
//           const firstThree = response.data.cars.slice(0, 3);
//           setCars(firstThree);
//         } else {
//           setError('No cars data available');
//         }
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//         setError('Failed to load featured cars');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCars();
//   }, []);

//   if (loading) return <div className="loading">Loading featured cars...</div>;
//   if (error) return <div className="error">{error}</div>;
//   if (cars.length === 0) return <div>No featured cars available</div>;

//   return (
//     <div>
//       <section className="section" style={{ backgroundColor: '#f9f9f9' }}>
//         <div className="section-title">
//           <h2>Featured Vehicles</h2>
//           <p>Explore our premium selection of cars available for purchase</p>
//         </div>

//         <div className="car-grid">
//           {cars.map((car) => (
//             <div className="car-card" key={car.id}>
//               <div className="car-image-container">
//                 <img
//                   src={car.cover_image ? `${process.env.REACT_APP_API_URL}/uploads${car.cover_image}` : 'https://via.placeholder.com/300x200?text=No+Image'}
//                   alt={`${car.make} ${car.model}`}
//                   className="car-img"
//                   onError={(e) => {
//                     e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
//                   }}
//                 />
//                 <div className="car-badges">
//                   <span className={`status-badge ${car.status.toLowerCase()}`}>
//                     {car.status}
//                   </span>
//                   <span className="type-badge">
//                     {car.ForSellRent === 'rent' ? 'For Rent' : 'For Sale'}
//                   </span>
//                 </div>
//               </div>
//               <div className="car-content">
//                 <h3 className="car-title">{car.make} {car.model} ({car.year})</h3>
//                 <div className="car-price">${car.price}</div>
//                 <div className="car-details">
//                   <div className="car-detail">
//                     <i className="fas fa-tachometer-alt"></i> {car.mileage.toLocaleString()} miles
//                   </div>
//                   <div className="car-detail">
//                     <i className="fas fa-gas-pump"></i> {car.fuel_type || 'N/A'}
//                   </div>
//                   <div className="car-detail">
//                     <i className="fas fa-cog"></i> {car.transmission}
//                   </div>
//                   <div className="car-detail">
//                     <i className="fas fa-palette"></i> {car.color}
//                   </div>
//                 </div>
//                 <Link to={`/cars/${car.id}`} className="btn btn-outline">
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div style={{ textAlign: 'center', marginTop: '3rem' }}>
//           <Link to="/cars" className="btn btn-primary">
//             View All Vehicles
//           </Link>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default FeaturedCars;












import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './FeaturedCars.css';
import { useTranslation } from 'react-i18next';

function FeaturedCars() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



    const {t,i18n}=useTranslation();
      const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
      };
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/car`);
        if (response.data.cars) {
          const firstThree = response.data.cars.slice(0, 3);
          setCars(firstThree);
        } else {
          setError('No cars data available');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError(t('Failed to load featured cars'));
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return <div className="listof-loading">{t(`Loading featured cars...`)}</div>;
  if (error) return <div className="listof-error">{error}</div>;
  if (cars.length === 0) return <div className="listof-empty">{t(`No featured cars available`)}</div>;

  return (
    <section className="listof-featured-section" style={{ backgroundColor: '#f9f9f9' }}>
      <div className="listof-section-header">
        <h2 className="listof-section-title">{t(`Featured Cars`)}</h2>
        <p className="listof-section-subtitle">{t(`Explore our premium selection of cars available for purchase`)}</p>
      </div>

      <div className="listof-featured-grid">
        {cars.map((car) => (
          <div className="listof-featured-card" key={car.id}>
            <div className="listof-featured-image-container">
              <img
                src={car.cover_image ? `${process.env.REACT_APP_API_URL}/uploads${car.cover_image}` : 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={`${car.make} ${car.model}`}
                className="listof-featured-img"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                }}
              />
              <div className="listof-featured-badges">
              {/* <span className={`listof-status-badge ${car.status ? car.status.toLowerCase() : ''}`}>
  {car.status || 'Available'}
</span> */}
<span className={`listof-type-badge ${car.ForSellRent ? car.ForSellRent.toLowerCase() : ''}`}>
  {car.ForSellRent === 'Rent' ? <>{t('For Rent')}</> : <>{t('For Sell')}</>}
</span>
              </div>
            </div>
            <div className="listof-featured-content">
              <h3 className="listof-featured-title">{car.make} {car.model} ({car.year})</h3>
              <div className="listof-featured-price">${car.price.toLocaleString()}</div>
              <div className="listof-featured-details">
                <div className="listof-featured-detail">
                  <i className="fas fa-tachometer-alt listof-featured-icon"></i>
                  <span>{car.mileage.toLocaleString()} miles</span>
                </div>
                <div className="listof-featured-detail">
                  <i className="fas fa-gas-pump listof-featured-icon"></i>
                  <span>{car.fuel_type || 'N/A'}</span>
                </div>
                <div className="listof-featured-detail">
                  <i className="fas fa-cog listof-featured-icon"></i>
                  <span>{car.transmission}</span>
                </div>
                <div className="listof-featured-detail">
                  <i className="fas fa-palette listof-featured-icon"></i>
                  <span>{car.color}</span>
                </div>
              </div>
              <Link to={`/cars/${car.id}`} className="listof-btn listof-btn-outline">
                  {t(`View Details`)}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="listof-featured-view-all">
        <Link to="/cars" className="listof-btn listof-btn-primary">
          {t(`View All Cars`)}
        </Link>
      </div>
    </section>
  );
}

export default FeaturedCars;