import React from 'react';

function CarGallery({ image_url, title }) {
  return (
    <div className="property-gallery">
      <img
        src={image_url}
        style={{ width: '500px', height: '500px', objectFit: 'cover', borderRadius: '8px' }}
        alt={title}
        className="main-image"
      />
      {/* Optional sample images */}
      <img
        src="https://images.unsplash.com/photo-1600121848594-d8644e57abab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        alt="Interior"
        className="secondary-image"
        style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <img
        src="https://images.unsplash.com/photo-1600566752227-8f1214b649af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        alt="Kitchen"
        className="secondary-image"
        style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <img
        src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        alt="Bedroom"
        className="secondary-image"
        style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
    </div>
  );
}

export default CarGallery;
