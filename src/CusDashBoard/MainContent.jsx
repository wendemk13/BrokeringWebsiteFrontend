import React from 'react';

function MainContent({ 
  listings, 
  totalListings, 
  activeListings, 
  filters, 
  setFilters, 
  currentPage, 
  totalPages, 
  setCurrentPage,
  showModal,
  editListing,
  deleteListing
}) {
  return (
    <div className="main-content">
      <div className="header">
        <h1>Seller Dashboard</h1>
        <div className="user-actions">
          <input 
            type="text" 
            className="search-bar" 
            placeholder="Search listings..."
            value={filters.search}
            onChange={(e) => setFilters({...filters, search: e.target.value})}
          />
          <button className="notification-btn">
            🔔
            <span className="notification-badge">3</span>
          </button>
          <img src="https://randomuser.me/api/portraits/women/44.jpg" className="profile-pic" alt="Profile"/>
        </div>
      </div>
      
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Listings</h3>
          <p>{totalListings}</p>
        </div>
        <div className="stat-card">
          <h3>Active Listings</h3>
          <p>{activeListings}</p>
        </div>
        <div className="stat-card">
          <h3>Unread Messages</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Total Sales</h3>
          <p>$142,000</p>
        </div>
      </div>
      
      <div className="filter-bar">
        <div className="filter-group">
          <select 
            className="filter-select" 
            value={filters.type}
            onChange={(e) => setFilters({...filters, type: e.target.value})}
          >
            <option value="all">All Types</option>
            <option value="house">Houses</option>
            <option value="car">Cars</option>
          </select>
          <select 
            className="filter-select" 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <button className="add-listing-btn" onClick={showModal}>
          <span>+</span>
          <span>Add New Listing</span>
        </button>
      </div>
      
      <div className="listings-table">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Type</th>
              <th>Price</th>
              <th>Views</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.length > 0 ? (
              listings.map(listing => (
                <tr key={listing.id}>
                  <td><img src={listing.image} className="listing-img" alt={listing.title}/></td>
                  <td>{listing.title}</td>
                  <td>{listing.type === 'house' ? 'House' : 'Car'}</td>
                  <td>{listing.price}</td>
                  <td>{listing.views}</td>
                  <td>
                    <span className={`status-badge status-${listing.status}`}>
                      {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn" title="Edit" onClick={() => editListing(listing.id)}>
                      ✏️
                    </button>
                    <button className="action-btn delete-btn" title="Delete" onClick={() => deleteListing(listing.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-state">
                  <h3>No listings found</h3>
                  <p>Try adjusting your filters or add a new listing</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {totalPages > 1 && (
        <div className="pagination">
          <button 
            className="page-btn" 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            &laquo;
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`page-btn ${page === currentPage ? 'active' : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="page-btn" 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default MainContent;