import React from 'react';
import { Link } from 'react-router-dom';

function PropertyContents({ id,title,image_url, status, price, address, bedrooms, bathrooms, area, type,description }) {
  return (
    <div>
      <div className="property-content">
        <div className="property-description">
          <h2 className="section-title">Property Description</h2>
          <p>
            {/* This stunning modern family home in the heart of Bole offers luxurious living with
            spacious rooms and high-end finishes. The property features an open-concept living
            area, gourmet kitchen, and a beautiful master suite with walk-in closet and ensuite. */}
            {description}
          </p>
          {/* <p>
            The home sits on a beautifully landscaped lot with a private backyard, perfect for
            entertaining. Located in one of Addis Ababa's most desirable neighborhoods, this
            property offers both convenience and luxury.
          </p> */}

          <h2 className="section-title" style={{ marginTop: '2.5rem' }}>Property Features</h2>
          <div className="property-features">
            <div className="feature-item">
              <i className="fas fa-bed"></i>
              <div>
                <h4>{bedrooms} Bedrooms</h4>
                <p>Spacious rooms with large windows</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-bath"></i>
              <div>
                <h4>{bathrooms} Bathrooms</h4>
                <p>Modern fixtures and finishes</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-ruler-combined"></i>
              <div>
                <h4>{area} sqft</h4>
                <p>Total living area</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-car"></i>
              <div>
                <h4>2 Garage Spaces</h4>
                <p>Attached garage</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-calendar-alt"></i>
              <div>
                <h4>Built in 2020</h4>
                <p>Modern construction</p>
              </div>
            </div>
            <div className="feature-item">
              <i className="fas fa-layer-group"></i>
              <div>
                <h4>2 Stories</h4>
                <p>With rooftop terrace</p>
              </div>
            </div>
          </div>

          <h2 className="section-title">Additional Details</h2>
          <ul style={{ listStylePosition: 'inside', lineHeight: 2 }}>
            <li>Central air conditioning</li>
            <li>Hardwood floors throughout</li>
            <li>Smart home features</li>
            <li>Security system</li>
            <li>Solar panels</li>
            <li>Backup generator</li>
          </ul>
        </div>

        <div className="property-sidebar">
          <div className="agent-card">
            <h2 className="section-title">Listing Agent</h2>
            <div className="agent-info">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Agent" className="agent-avatar" />
              <div>
                <h3>Selamawit Kebede</h3>
                <p>Certified HomeNest Agent</p>
                <p><i className="fas fa-star"></i> 4.9 (28 reviews)</p>
              </div>
            </div>
            <div className="agent-contact">
              <Link href="#" className="btn btn-primary" style={{ flex: 1 }}>
                <i className="fas fa-phone"></i> Call
              </Link>
              <Link href="#" className="btn btn-outline" style={{ flex: 1 }}>
                <i className="fas fa-envelope"></i> Email
              </Link>
            </div>
          </div>

          <div className="inquiry-form">
            <h2 className="section-title">Schedule a Viewing</h2>
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
                Request Viewing
              </button>
            </form>
          </div>

          <div className="inquiry-form">
            <h2 className="section-title">Mortgage Calculator</h2>
            <form>
              <div className="form-group">
                <label htmlFor="price">Home Price ($)</label>
                <input type="number" id="price" className="form-control" value="320000" />
              </div>
              <div className="form-group">
                <label htmlFor="downpayment">Down Payment ($)</label>
                <input type="number" id="downpayment" className="form-control" value="64000" />
              </div>
              <div className="form-group">
                <label htmlFor="loan-term">Loan Term (years)</label>
                <select id="loan-term" className="form-control">
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30" selected>30 years</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="interest-rate">Interest Rate (%)</label>
                <input type="number" id="interest-rate" className="form-control" step="0.01" value="4.5" />
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

export default PropertyContents;
