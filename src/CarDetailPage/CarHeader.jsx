import React from 'react';

function CarHeader({ title, price, status, make, model, year }) {
  return (
    <div className="property-header">
      <div>
        <h1 className="property-title">{title}</h1>
        <p className="property-address">
          <i className="fas fa-car"></i> {make} {model} {year}
        </p>
        <span className="property-badge">{status}</span>
      </div>
      <div className="property-price">${price}</div>
    </div>
  );
}

export default CarHeader;

