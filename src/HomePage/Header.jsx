import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="top-bar">
        <div className="logo">
          <h1>Bet<span>Gebeya</span></h1>
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i><h1 style={{color:"red"}}>bar</h1>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <Link href="#" className="active moblink">Home</Link>
        <Link href="#" className='moblink'>Properties</Link>
        <Link href="#" className='moblink'>Cars</Link>
        <Link href="#" className='moblink'>Agents</Link>
        <Link href="#" className='moblink'>About</Link>
        <Link href="#" className='moblink'>Contact</Link>
      </nav>

      {/* User Actions */}
      <div className={`user-actions ${menuOpen ? 'active' : ''}`}>
        <Link href="#" className="btn btn-chatbot" id="chatbot-button">
          <i className="fas fa-robot"></i> Support
        </Link>
        <i className="fas fa-search search-toggle"></i>
        <Link href="#" className="btn btn-outline">Login</Link>
        <Link href="#" className="btn btn-primary">Register</Link>
      </div>
    </header>
  );
}

export default Header;
