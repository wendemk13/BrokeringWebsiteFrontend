import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import CarGallery from './CarGallery.jsx'
import CarContents from './CarContents.jsx';
import CarSimilars from './CarSimilars.jsx';
import CarHeader from './CarHeader.jsx';
function CarDetailPage() {
     const [loading, setLoading] = useState(true);
  const [detail,setdetail]=useState([]);
  const {id}=useParams();
  console.log(id)
  useEffect(()=>{const fetchdetail = async () => {
      try {
        const response = await axios.get(`https://brokeringbackend.onrender.com/api/cars/${id}`);
        setdetail(response.data.car); 
      } catch (error) {
        console.error('Error fetching houses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchdetail();},[id])

  return (
     <div className="property-detail-container">
      {/* {
      detail.map((d,index)=>(
        <>
         <PropertyHeader key={index} {...d}/>
       <PropertyGallery key={index} {...d}/>
       <PropertyContents key={index} {...d}/>
       <Similars key={index} {...d}/>
        </>

      ))
    } */}

    {loading ? (
    <p>Loading...</p>
  ) : (
    <>
    <CarHeader {...detail}/>
      <CarGallery {...detail} />
      <CarContents {...detail} />
      <CarSimilars {...detail}/>
    </>
  )}
     
    </div>
  );
}

export default CarDetailPage;
