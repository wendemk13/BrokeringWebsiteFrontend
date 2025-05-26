import React from 'react';

function PropertyGallery() {
  return (
    <div>
      <div className="property-gallery">
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
          alt="Modern Family Home" 
          className="main-image"
        />
        <img 
          src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Living Room" 
          className="secondary-image"
        />
        <img 
          src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Kitchen" 
          className="secondary-image"
        />
        <img 
          src="https://images.unsplash.com/photo-1600566752227-8f1214b649af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Bedroom" 
          className="secondary-image"
        />
        <img 
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
          alt="Bathroom" 
          className="secondary-image"
        />
      </div>
    </div>
  );
}

export default PropertyGallery;
