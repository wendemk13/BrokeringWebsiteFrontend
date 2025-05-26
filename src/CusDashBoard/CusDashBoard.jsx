


import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import MainContent from './MainContent';
import Modal from './Modal';

import './CusDashBoard.css'


function CusDashBoard() {
  // State for listings data
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

  // Modal and form state
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    type: '',
    title: '',
    price: '',
    image: ''
  });

  // Filter and pagination state
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 5;

  // Dark mode state
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('darkMode') === 'true'
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', newMode);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Save or update listing
  const handleSubmit = (e) => {
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

  // Edit listing
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

  // Delete listing
  const deleteListing = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setListings(prev => prev.filter(l => l.id !== id));
    }
  };

  // Filter listings
  const filteredListings = listings.filter(listing => {
    const matchesType = filters.type === 'all' || listing.type === filters.type;
    const matchesStatus = filters.status === 'all' || listing.status === filters.status;
    const matchesSearch = listing.title.toLowerCase().includes(filters.search.toLowerCase());
    return matchesType && matchesStatus && matchesSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);
  const startIndex = (currentPage - 1) * listingsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, startIndex + listingsPerPage);

  return (
    <div className={`dashboard ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <MainContent 
        listings={paginatedListings} 
        totalListings={listings.length}
        activeListings={listings.filter(l => l.status === 'active').length}
        filters={filters}
        setFilters={setFilters}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        showModal={() => setShowModal(true)}
        editListing={editListing}
        deleteListing={deleteListing}
      />
      {showModal && (
        <Modal 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          closeModal={() => {
            setShowModal(false);
            setFormData({ id: null, type: '', title: '', price: '', image: '' });
          }}
        />
      )}
    </div>
  );
}

export default CusDashBoard;
