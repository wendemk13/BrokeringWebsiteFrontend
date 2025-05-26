import React from 'react'

function PropertyGallery({ id,title,image_url, status, price, address, bedrooms, bathrooms, area, type,description }) {
  return (
    <div>            
         {/* <span class="property-badge">For Sale</span> */}

         <div class="property-gallery">
            <img  src={image_url}   style={{ width: '500px', height: '500px', objectFit: 'cover' }}
            alt="Modern Family Home" class="main-image"/>
            <img  src='' style={{
    width: '300px',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px'
  }} alt="Living Room" class="secondary-image"/>
            <img src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                 alt="Kitchen" class="secondary-image"/>
            <img src="https://images.unsplash.com/photo-1600566752227-8f1214b649af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                 alt="Bedroom" class="secondary-image"/>
            <img src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                 alt="Bathroom" class="secondary-image"/>
        </div>
    </div>
  )
}

export default PropertyGallery
