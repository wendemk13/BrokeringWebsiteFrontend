import React from 'react'

function PropertyHeader({ id,title,image_url, status, price, address, bedrooms, bathrooms, area, type }) {
  return (
    <div>
       <div class="property-header">
            <div>
                <h1 class="property-title">{title}</h1>
                <p class="property-address">
                    <i class="fas fa-map-marker-alt"></i> Bole, Addis Ababa, Ethiopia
                </p>
            </div>
            <div class="property-price">$320,000</div>
        </div>
                {/* <span class="property-badge">For Sale</span> */}

    </div>
  )
}

export default PropertyHeader
