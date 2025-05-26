import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar({ darkMode, toggleDarkMode }) {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">🏠</span>
        <span>BrokerPro</span>
      </div>
      <Link href="#" className="nav-item active">
        <i>📊</i>
        <span>Dashboard</span>
      </Link>
      <Link href="#" className="nav-item">
        <i>🚗</i>
        <span>Listings</span>
      </Link>
      <Link href="#" className="nav-item">
        <i>💬</i>
        <span>Messages</span>
      </Link>
      <Link href="#" className="nav-item">
        <i>📈</i>
        <span>Analytics</span>
      </Link>
      <Link href="#" className="nav-item">
        <i>⚙️</i>
        <span>Settings</span>
      </Link>
      
      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? '☀️' : '🌓'}
      </button>
    </div>
  );
}

export default Sidebar;