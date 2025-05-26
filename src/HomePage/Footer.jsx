import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div>
      <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <h3>HomeNest</h3>
          <p>
            Your trusted platform for buying, selling, and renting properties
            and vehicles.
          </p>
          <div className="social-links">
            <Link href="#"><i className="fab fa-facebook-f"></i></Link>
            <Link href="#"><i className="fab fa-twitter"></i></Link>
            <Link href="#"><i className="fab fa-instagram"></i></Link>
            <Link href="#"><i className="fab fa-linkedin-in"></i></Link>
          </div>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link href="#">Home</Link></li>
            <li><Link href="#">Properties</Link></li>
            <li><Link href="#">Cars</Link></li>
            <li><Link href="#">About Us</Link></li>
            <li><Link href="#">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Properties</h3>
          <ul className="footer-links">
            <li><Link href="#">Houses</Link></li>
            <li><Link href="#">Apartments</Link></li>
            <li><Link href="#">Commercial</Link></li>
            <li><Link href="#">Land</Link></li>
            <li><Link href="#">Vacation Homes</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Vehicles</h3>
          <ul className="footer-links">
            <li><Link href="#">Cars</Link></li>
            <li><Link href="#">SUVs</Link></li>
            <li><Link href="#">Trucks</Link></li>
            <li><Link href="#">Motorbikes</Link></li>
            <li><Link href="#">Commercial Vehicles</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul className="footer-links">
            <li>
              <i className="fas fa-map-marker-alt"></i> Bole, Addis Ababa, Ethiopia
            </li>
            <li><i className="fas fa-phone"></i> +251 912 345 678</li>
            <li><i className="fas fa-envelope"></i> info@homenest.com</li>
            <li><i className="fas fa-clock"></i> Mon-Fri: 9AM - 6PM</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; 2023 HomeNest. All Rights Reserved. |
          <Link href="#">Privacy Policy</Link> | <Link href="#">Terms of Service</Link>
        </p>
      </div>
    </footer>
    </div>
  )
}

export default Footer
