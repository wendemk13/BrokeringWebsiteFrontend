import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <button className="menu-toggle" id="menuToggle">☰</button>
            <h1>Seller Dashboard</h1>
            <div className="user-actions">
                <input type="text" className="search-bar" placeholder="Search listings..." />
                <button className="notification-btn">
                    🔔
                    <span className="notification-badge">3</span>
                </button>
                <img src="https://randomuser.me/api/portraits/women/44.jpg" className="profile-pic" alt="Profile" />
            </div>
        </div>
    );
};

export default Header;