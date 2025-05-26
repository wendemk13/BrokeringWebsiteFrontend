import React, { useState, useEffect } from 'react';
import StatsCards from './StatsCards';
import ListingsTable from './ListingsTable';
import AddListingModal from './AddListingModal';
import './MainContent.css';

function MainContent() {
  const [listings, setListings] = useState([
    {
      id: 1,
      type: 'house',
      title: '3-Bedroom Villa',
      price: '$350,000',
      views: 124,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?w=200'
    },
    // ... other listings
  ]);

  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    type: '',
    title: '',
    price: '',
    image: ''
  });

  const listingsPerPage = 5;

  const filteredListings = listings.filter(listing => {
    const matchesType = filters.type === 'all' || listing.type === filters.type;
    const matchesStatus = filters.status === 'all' || listing.status === filters.status;
    const matchesSearch = listing.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
  const startIndex = (currentPage - 1) * listingsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, startIndex + listingsPerPage);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
    setCurrentPage(1);
  };

  const saveListing = (e) => {
    e.preventDefault();
    if (formData.id) {
      // Update existing listing
      setListings(prev => prev.map(listing => 
        listing.id === formData.id ? {
          ...listing,
          type: formData.type,
          title: formData.title,
          price: '$' + parseInt(formData.price).toLocaleString(),
          image: formData.image || listing.image
        } : listing
      ));
    } else {
      // Add new listing
      const newListing = {
        id: Math.max(...listings.map(l => l.id)) + 1,
        type: formData.type,
        title: formData.title,
        price: '$' + parseInt(formData.price).toLocaleString(),
        views: Math.floor(Math.random() * 300),
        status: 'active',
        image: formData.image || 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=200'
      };
      setListings(prev => [newListing, ...prev]);
    }
    setShowModal(false);
    setFormData({ id: null, type: '', title: '', price: '', image: '' });
  };

  const editListing = (id) => {
    const listing = listings.find(l => l.id === id);
    if (listing) {
      setFormData({
        id: listing.id,
        type: listing.type,
        title: listing.title,
        price: listing.price.replace(/\D/g, ''),
        image: listing.image
      });
      setShowModal(true);
    }
  };

  const deleteListing = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  return (
    <div className="main-content">
      <StatsCards 
        totalListings={listings.length}
        activeListings={listings.filter(l => l.status === 'active').length}
      />
      
      <div className="filter-bar">
        <div className="filter-group">
          <select 
            className="filter-select" 
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="all">All Types</option>
            <option value="house">Houses</option>
            <option value="car">Cars</option>
          </select>
          <select 
            className="filter-select" 
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="sold">Sold</option>
          </select>
        </div>
        <button className="add-listing-btn" onClick={() => setShowModal(true)}>
          <span>+</span>
          <span>Add New Listing</span>
        </button>
      </div>
      
      <ListingsTable 
        listings={paginatedListings}
        editListing={editListing}
        deleteListing={deleteListing}
        isEmpty={filteredListings.length === 0}
      />
      
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
      
      {showModal && (
        <AddListingModal 
          formData={formData}
          setFormData={setFormData}
          onSave={saveListing}
          onClose={() => {
            setShowModal(false);
            setFormData({ id: null, type: '', title: '', price: '', image: '' });
          }}
        />
      )}
    </div>
  );
}

export default MainContent;