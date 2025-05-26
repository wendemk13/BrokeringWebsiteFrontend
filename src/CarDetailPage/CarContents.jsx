import React from 'react';
import {Link} from 'react-router-dom'

function CarContents({ id, title, image_url, status, price, make, model, year, fuel_type, color, description }) {
  return (
    <div>
      <div className="car-content">
        <div className="car-description">
          <h2 className="section-title">Car Description</h2>
          <p>{description}</p>

          <h2 className="section-title" style={{ marginTop: '2.5rem' }}>Car Features</h2>
          <div className="car-features">
            <div className="feature-item">
              <i className="fas fa-car-side"></i>
              <div>
                <h4>{make} {model} ({year})</h4>
                <p>Make and Model</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-gas-pump"></i>
              <div>
                <h4>{fuel_type}</h4>
                <p>Fuel Type</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-palette"></i>
              <div>
                <h4>{color}</h4>
                <p>Car Color</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-tachometer-alt"></i>
              <div>
                <h4>{price}</h4>
                <p>Price</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-cogs"></i>
              <div>
                <h4>{status}</h4>
                <p>Car Status</p>
              </div>
            </div>
          </div>

          <h2 className="section-title">Additional Details</h2>
          <ul style={{ listStylePosition: 'inside', lineHeight: 2 }}>
            <li>Automatic Transmission</li>
            <li>Luxury SUV</li>
            <li>Strong performance and comfort</li>
            <li>Low mileage</li>
            <li>Full-service history available</li>
            <li>Advanced safety features</li>
          </ul>
        </div>

        <div className="car-sidebar">
          <div className="seller-card">
            <h2 className="section-title">Seller Details</h2>
            <div className="seller-info">
              <img src="https://randomuser.me/api/portraits/men/45.jpg" alt="Seller" className="seller-avatar" />
              <div>
                <h3>John Doe</h3>
                <p>Verified Car Dealer</p>
                <p><i className="fas fa-star"></i> 4.8 (32 reviews)</p>
              </div>
            </div>
            <div className="seller-contact">
              <Link href="#" className="btn btn-primary" style={{ flex: 1 }}>
                <i className="fas fa-phone"></i> Call
              </Link>
              <Link href="#" className="btn btn-outline" style={{ flex: 1 }}>
                <i className="fas fa-envelope"></i> Email
              </Link>
            </div>
          </div>

          <div className="inquiry-form">
            <h2 className="section-title">Schedule a Test Drive</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="date">Preferred Date</label>
                <input type="date" id="date" className="form-control" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" className="form-control" rows="3"></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block">
                Request Test Drive
              </button>
            </form>
          </div>

          <div className="loan-calculator">
            <h2 className="section-title">Car Loan Calculator</h2>
            <form>
              <div className="form-group">
                <label htmlFor="price">Car Price ($)</label>
                <input type="number" id="price" className="form-control" value={price} />
              </div>
              <div className="form-group">
                <label htmlFor="downpayment">Down Payment ($)</label>
                <input type="number" id="downpayment" className="form-control" />
              </div>
              <div className="form-group">
                <label htmlFor="loan-term">Loan Term (years)</label>
                <select id="loan-term" className="form-control">
                  <option value="5">5 years</option>
                  <option value="7">7 years</option>
                  <option value="10">10 years</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="interest-rate">Interest Rate (%)</label>
                <input type="number" id="interest-rate" className="form-control" step="0.01" value="5.5" />
              </div>
              <button type="button" className="btn btn-primary btn-block" id="calculate-btn">
                Calculate Payment
              </button>
              <div className="calculation-results" style={{ marginTop: '1.5rem', padding: '1rem', backgroundColor: 'var(--light)', borderRadius: '8px', display: 'none' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>Estimated Monthly Payment:</h4>
                <p id="monthly-payment" style={{ fontSize: '1.2rem', fontWeight: '600', color: 'var(--primary)' }}></p>
                <p style={{ fontSize: '0.8rem', color: 'var(--gray)', marginTop: '0.5rem' }}>Principal & Interest only</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarContents;
