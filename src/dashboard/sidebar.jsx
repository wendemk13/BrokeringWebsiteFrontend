import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faHome, 
  faCar, 
  faUsers, 
  faExchangeAlt, 
  faComments, 
  faRobot, 
  faCog, 
  faSignOutAlt
  // faBars
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

function Sidebar() {
 
  const [isSidebarActive, setIsSidebarActive] = useState(true);

  // const toggleSidebar = () => {
  //   setIsSidebarActive(prev => !prev);
  // };

  return (
    <div className='admin-side'>
    <div className={`admin-sidebar ${isSidebarActive ? 'admin-active' : ''}`}>
      {/* <div className="admin-sidebar-header">
        <h3>AdminPanel</h3>
        <button 
          onClick={toggleSidebar}
          className="admin-sidebar-toggle"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div> */}
      <div className="admin-sidebar-menu">
        <ul className="admin-sidebar-list">
          <li className="admin-sidebar-item">
            <Link to="/admin" className="admin-sidebar-link admin-active">
              <FontAwesomeIcon icon={faTachometerAlt} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Dashboard</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/admin/houses" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faHome} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Houses</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/admin/cars" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faCar} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Cars</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/admin/users" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faUsers} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Users</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/admin/transactions" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faExchangeAlt} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Transactions</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/admin/chat" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faComments} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Chat Support</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/admin/chatbot" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faRobot} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Chatbot</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/adminsettings" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faCog} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Settings</span>
            </Link>
          </li>
          <li className="admin-sidebar-item">
            <Link to="/logout" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faSignOutAlt} className="admin-sidebar-icon" />
              <span className="admin-menu-text">Logout</span>
            </Link>
            <Link to="/user/InboxMessages" className="admin-sidebar-link">
              <FontAwesomeIcon icon={faSignOutAlt} className="admin-sidebar-icon" />
              <span className="admin-menu-text">chats</span>
            </Link>
          </li>
        </ul>
      </div>
    </div></div>
  );
}

export default Sidebar;