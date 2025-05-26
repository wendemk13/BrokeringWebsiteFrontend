import React from 'react';
import { Link } from 'react-router-dom';

function Similars() {
  return (
    <div>
      <div className="similar-listings">
        <h2 className="section-title">Similar Properties in Bole</h2>
        <div className="listing-grid">
          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1605146769289-440113cc3d00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Contemporary Home" 
              className="listing-img" 
            />
            <div className="listing-content">
              <div className="listing-price">$285,000</div>
              <div className="listing-address">Bole, Addis Ababa</div>
              <div className="listing-features">
                <span><i className="fas fa-bed"></i> 4 beds</span>
                <span><i className="fas fa-bath"></i> 3 baths</span>
                <span><i className="fas fa-ruler-combined"></i> 2,800 sqft</span>
              </div>
              <Link href="#" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>
            </div>
          </div>

          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Luxury Villa" 
              className="listing-img" 
            />
            <div className="listing-content">
              <div className="listing-price">$375,000</div>
              <div className="listing-address">Bole, Addis Ababa</div>
              <div className="listing-features">
                <span><i className="fas fa-bed"></i> 5 beds</span>
                <span><i className="fas fa-bath"></i> 4 baths</span>
                <span><i className="fas fa-ruler-combined"></i> 3,500 sqft</span>
              </div>
              <Link href="#" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>
            </div>
          </div>

          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
              alt="Modern Apartment" 
              className="listing-img" 
            />
            <div className="listing-content">
              <div className="listing-price">$220,000</div>
              <div className="listing-address">Bole, Addis Ababa</div>
              <div className="listing-features">
                <span><i className="fas fa-bed"></i> 3 beds</span>
                <span><i className="fas fa-bath"></i> 2 baths</span>
                <span><i className="fas fa-ruler-combined"></i> 1,800 sqft</span>
              </div>
              <Link href="#" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Similars;
