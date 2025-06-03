import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer>
        <div className="footer-grid">
          <div className="footer-col">
            <h3>BetGebeya</h3>
            <p>
              Your trusted platform for buying, selling, and renting properties
              and vehicles.
            </p>
            <div className="social-links">
              <Link to="/">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link to="/">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link to="/">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link to="/">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/properties">Properties</Link>
              </li>
              <li>
                <Link to="/cars">Cars</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* <div className="footer-col">
          <h3>Properties</h3>
          <ul className="footer-links">
            <li><Link to='/'>Houses</Link></li>
            <li><Link to='/'>Apartments</Link></li>
            <li><Link to='/'>Commercial</Link></li>
            <li><Link to='/'>Land</Link></li>
            <li><Link to='/'>Vacation Homes</Link></li>
          </ul>
        </div> */}
          {/* 
        <div className="footer-col">
          <h3>Vehicles</h3>
          <ul className="footer-links">
            <li><Link to='/'>Cars</Link></li>
            <li><Link to='/'>SUVs</Link></li>
            <li><Link to='/'>Trucks</Link></li>
            <li><Link to='/'>Motorbikes</Link></li>
            <li><Link to='/'>Commercial Vehicles</Link></li>
          </ul>
        </div> */}

          <div className="footer-col">
            <h3>Contact Us</h3>
            <ul className="footer-links">
              <li>
                <i className="fas fa-map-marker-alt"></i> Bole, Addis Ababa,
                Ethiopia
              </li>
              <li>
                <i className="fas fa-phone"></i> +251 912 345 678
              </li>
              <li>
                <i className="fas fa-envelope"></i> info@BetGebeya.com
              </li>
              <li>
                <i className="fas fa-clock"></i> Mon-Fri: 9AM - 6PM
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2023 BetGebeya. All Rights Reserved. 
            {/* <Link to="/">Privacy Policy</Link> |{" "}
            <Link to="/">Terms of Service</Link> */}
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Footer
