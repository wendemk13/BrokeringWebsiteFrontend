import React, { useState, useEffect } from 'react';
import { FaHome, FaList, FaPlusCircle, FaUser, FaCog, FaSignOutAlt, FaBell, FaSearch } from 'react-icons/fa';

const CusDashBoard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    profileImage: '/default-profile.jpg'
  });
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'Luxury Villa',
      price: 350000,
      location: 'Addis Ababa',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      status: 'active',
      images: ['/default-property.jpg']
    },
    {
      id: 2,
      title: 'Modern Apartment',
      price: 150000,
      location: 'Bole',
      bedrooms: 2,
      bathrooms: 2,
      area: 1200,
      status: 'pending',
      images: ['/default-property.jpg']
    }
  ]);
  const [loading, setLoading] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview user={user} posts={posts} />;
      case 'properties':
        return <MyProperties posts={posts} />;
      case 'create':
        return <CreatePost />;
      case 'profile':
        return <UserProfile user={user} />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview user={user} posts={posts} />;
    }
  };

  if (loading) {
    return <div className="cusdash-loading-spinner">Loading...</div>;
  }

  return (
    <div className="cusdash-dashboard-container">
      {/* Sidebar Navigation */}
      <div className="cusdash-dashboard-sidebar">
        <div className="cusdash-sidebar-header">
          <h2>HomeNest</h2>
          <p>Welcome back, {user?.name || 'User'}!</p>
        </div>
        
        <nav className="cusdash-sidebar-nav">
          <button 
            className={activeTab === 'dashboard' ? 'cusdash-active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <FaHome /> Dashboard
          </button>
          <button 
            className={activeTab === 'properties' ? 'cusdash-active' : ''}
            onClick={() => setActiveTab('properties')}
          >
            <FaList /> My Properties
          </button>
          <button 
            className={activeTab === 'create' ? 'cusdash-active' : ''}
            onClick={() => setActiveTab('create')}
          >
            <FaPlusCircle /> Create Post
          </button>
          <button 
            className={activeTab === 'profile' ? 'cusdash-active' : ''}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser /> Profile
          </button>
          <button 
            className={activeTab === 'settings' ? 'cusdash-active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </button>
        </nav>
        
        <div className="cusdash-sidebar-footer">
          <button className="cusdash-logout-btn">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="cusdash-dashboard-main">
        {/* Top Navigation Bar */}
        <header className="cusdash-dashboard-header">
          <div className="cusdash-search-bar">
            <FaSearch />
            <input type="text" placeholder="Search properties, posts..." />
          </div>
          
          <div className="cusdash-user-actions">
            <div className="cusdash-notifications">
              <FaBell />
              {notifications.length > 0 && (
                <span className="cusdash-notification-badge">{notifications.length}</span>
              )}
            </div>
            
            <div className="cusdash-user-profile">
              <img src={user?.profileImage || '/default-profile.jpg'} alt="Profile" />
              <span>{user?.name || 'User'}</span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="cusdash-dashboard-content">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

// Dashboard Components (keep all the same component implementations as before)
const DashboardOverview = ({ user, posts }) => {
  // ... (same implementation as before)
};

const MyProperties = ({ posts }) => {
  // ... (same implementation as before)
};

const PropertyCard = ({ post }) => {
  // ... (same implementation as before)
};

const CreatePost = () => {
  // ... (same implementation as before)
};

const UserProfile = ({ user }) => {
  // ... (same implementation as before)
};

const Settings = () => {
  // ... (same implementation as before)
};

export default CusDashBoard;