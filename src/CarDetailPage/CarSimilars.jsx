import React from 'react';
import { Link } from 'react-router-dom';

function CarSimilars() {
  return (
    <div>
      <div className="similar-listings">
        <h2 className="section-title">Similar Cars in Bole</h2>
        <div className="listing-grid">
          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1617891202177-4f00ecf929b5?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHx8Y2FyfHx8fHx8fHwxNjc2NTE0MTM5&ixlib=rb-1.2.1&q=80&w=400" 
              alt="Luxury Sedan" 
              className="listing-img" 
            />
            <div className="listing-content">
              <div className="listing-price">$50,000</div>
              <div className="listing-address">Bole, Addis Ababa</div>
              <div className="listing-features">
                <span><i className="fas fa-car"></i> Luxury Sedan</span>
                <span><i className="fas fa-cogs"></i> Automatic</span>
                <span><i className="fas fa-tachometer-alt"></i> 25,000 miles</span>
              </div>
              <Link href="#" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>
            </div>
          </div>

          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1604967566958-f2d8e6f1f118?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHx8Y2FyfHx8fHx8fHwxNjc2NTE0MTM5&ixlib=rb-1.2.1&q=80&w=400" 
              alt="Sporty Coupe" 
              className="listing-img" 
            />
            <div className="listing-content">
              <div className="listing-price">$45,000</div>
              <div className="listing-address">Bole, Addis Ababa</div>
              <div className="listing-features">
                <span><i className="fas fa-car"></i> Sporty Coupe</span>
                <span><i className="fas fa-cogs"></i> Manual</span>
                <span><i className="fas fa-tachometer-alt"></i> 30,000 miles</span>
              </div>
              <Link href="#" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>           </div>
          </div>

          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1625091344602-cdb522cbfa91?crop=entropy&cs=tinysrgb&fit=max&ixid=MnwzNjAwMjJ8MHx8Y2FyfHx8fHx8fHwxNjc2NTE0MTM5&ixlib=rb-1.2.1&q=80&w=400" 
              alt="SUV" 
              className="listing-img" 
            />
            <div className="listing-content">
              <div className="listing-price">$60,000</div>
              <div className="listing-address">Bole, Addis Ababa</div>
              <div className="listing-features">
                <span><i className="fas fa-car"></i> SUV</span>
                <span><i className="fas fa-cogs"></i> Automatic</span>
                <span><i className="fas fa-tachometer-alt"></i> 15,000 miles</span>
              </div>
              <Link href="#" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>View Details</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarSimilars;
