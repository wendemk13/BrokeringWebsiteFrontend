// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './Houses.css';

// function Houses() {
//   const [houses, setHouses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem('user'));
//     if (!user || !user.id) {
//       console.error('User ID not found');
//       return;
//     }
//     setUserId(user.id);
//   }, []);

//   useEffect(() => {
//     if (!userId) return;

//     const fetchHouses = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/userhouses?userId=${userId}`);
//         setHouses(response.data);
//       } catch (error) {
//         console.error('Error fetching houses:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHouses();
//   }, [userId]);

//   return (
//     <div className="houses-container">
//       <h2>Your Houses</h2>
//       {loading ? (
//         <p>Loading houses...</p>
//       ) : houses.length > 0 ? (
//         <div className="house-grid">
//           {houses.map((house) => (
//             <div className="house-card" key={house.id || house._id}>
//               {/* <img src={house.image_url || house.cover_image} alt={house.title} className="house-image" /> */}
//               <img
//   src={`${process.env.REACT_APP_API_URL}/uploads/${house.cover_image}`}
//   className="listing-img"
//   alt={house.title}
// />
//               <div className="house-info">
//                 <h3>{house.title}</h3>
//                 <p><strong>Price:</strong> ${house.price}</p>
//                 <p><strong>Status:</strong> {house.status}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No houses found.</p>
//       )}
//     </div>
//   );
// }

// export default Houses;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Houses.css';
import { useTranslation } from 'react-i18next';

function Houses() {
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.id) {
      console.error('User ID not found');
      return;
    }
    setUserId(user.id);
  }, []);

  useEffect(() => {
    if (!userId) return;

    const fetchHouses = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/userhouses?userId=${userId}`);
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, [userId]);

  const handleHouseClick = (houseId) => {
    navigate(`/houses/${houseId}`);
  };

  return (
    <div className="houses-container">
      <h2>{t(`Your Houses`)}</h2>
      {loading ? (
        <p>Loading houses...</p>
      ) : houses.length > 0 ? (
        <div className="house-grid">
          {houses.map((house) => (
            <div 
              className="house-card" 
              key={house.id || house._id}
              onClick={() => handleHouseClick(house.id)}
            >
              <img
                src={`${process.env.REACT_APP_API_URL}/uploads${house.cover_image}`}
                className="listing-img"
                alt={house.title}
              />
              <div className="house-info">
                <h3>{house.title}</h3>
                <p><strong>Price:</strong> ${house.price} {house.ForSellRent === 'Rent' ? '/month' : ''}</p>
                <p><strong>Status:</strong> {house.status}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No houses found.</p>
      )}
    </div>
  );
}

export default Houses;