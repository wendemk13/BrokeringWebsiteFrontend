import React, { useEffect, useState } from 'react'
import './PropertyDetailPage.css'
import PropertyHeader from './PropertyHeader'
import PropertyGallery from './PropertyGallery'
import PropertyContents from './PropertyContents'
import Similars from './PropertySimilars'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function DetailPage() {
    const [loading, setLoading] = useState(true);
  const [detail,setdetail]=useState([]);
  const {id}=useParams();
  console.log(id)
  useEffect(()=>{const fetchdetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/houses/${id}`);
        setdetail(response.data.house); 
            console.log(response.data)

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
      <PropertyHeader {...detail} />
      <PropertyGallery {...detail} />
      <PropertyContents {...detail} />
      <Similars {...detail} />
    </>
  )}
     
    </div>
  )
}

export default DetailPage
