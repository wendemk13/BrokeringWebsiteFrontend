import './SearchPage.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSearch,
  faCar,
  faHome,
  faMoneyBillWave,
  faCalendarAlt,
  faCogs,
  faBath,
  faBed,
  faMapMarkerAlt,
  faFilter,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import axios from 'axios';

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1
  });
  const [filters, setFilters] = useState({
    listingType: 'all', // 'all', 'Rent', 'sell'
    propertyType: 'all', // 'all', 'car', 'House'
    priceRange: [0, 1000000],
    location: '',
    bedrooms: '',
    bathrooms: '',
    carMake: '',
    carModel: '',
    yearRange: [1990, new Date().getFullYear()],
    transmission: '',
    fuelType: '',
    color: '',
    mileageRange: [0, 500000],
    houseType: '',
    areaRange: [0, 10000],
    sortBy: 'created_at',
    sortOrder: 'DESC'
  });

  const navigate = useNavigate();

  const handleSearch = async (page = 1) => {
    setIsLoading(true);

    try {
      // Prepare the query parameters
      const params = {
        searchTerm,
        page,
        limit: pagination.limit,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      };

      // Add property type if not 'all'
      if (filters.propertyType !== 'all') {
        params.propertyType = filters.propertyType.toLowerCase();
      }

      // Add listing type if not 'all'
      if (filters.listingType !== 'all') {
        params.listingType = filters.listingType === 'rent' ? 'Rent' : 'sell';
      }

      // Price range
      if (filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) {
        params.minPrice = filters.priceRange[0];
        params.maxPrice = filters.priceRange[1];
      }

      // Location
      if (filters.location) {
        params.location = filters.location;
      }

      // Property type specific filters
      if (filters.propertyType === 'House') {
        // House filters
        if (filters.bedrooms) {
          params.bedrooms = filters.bedrooms;
        }
        if (filters.bathrooms) {
          params.bathrooms = filters.bathrooms;
        }
        if (filters.houseType) {
          params.houseType = filters.houseType;
        }
        if (filters.areaRange[0] > 0 || filters.areaRange[1] < 10000) {
          params.minArea = filters.areaRange[0];
          params.maxArea = filters.areaRange[1];
        }
      } else if (filters.propertyType === 'car') {
        // Car filters
        if (filters.carMake) {
          params.carMake = filters.carMake;
        }
        if (filters.carModel) {
          params.carModel = filters.carModel;
        }
        if (filters.yearRange[0] > 1990 || filters.yearRange[1] < new Date().getFullYear()) {
          params.minYear = filters.yearRange[0];
          params.maxYear = filters.yearRange[1];
        }
        if (filters.transmission) {
          params.transmission = filters.transmission;
        }
        if (filters.fuelType) {
          params.fuelType = filters.fuelType;
        }
        if (filters.color) {
          params.color = filters.color;
        }
        if (filters.mileageRange[0] > 0 || filters.mileageRange[1] < 500000) {
          params.minMileage = filters.mileageRange[0];
          params.maxMileage = filters.mileageRange[1];
        }
      }

      const response = await axios.get('http://localhost:5000/api/search/searchProperties', { params });
      setSearchResults(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error('Error searching properties:', error);
      // You might want to set some error state here
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRangeChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePageChange = (newPage) => {
    handleSearch(newPage);
  };

  const handleViewDetails = (id, propertyType) => {
    navigate(`/property-details/${id}`, { state: { propertyType } });
  };

  const resetFilters = () => {
    setFilters({
      listingType: 'all',
      propertyType: 'all',
      priceRange: [0, 1000000],
      location: '',
      bedrooms: '',
      bathrooms: '',
      carMake: '',
      carModel: '',
      yearRange: [1990, new Date().getFullYear()],
      transmission: '',
      fuelType: '',
      color: '',
      mileageRange: [0, 500000],
      houseType: '',
      areaRange: [0, 10000],
      sortBy: 'created_at',
      sortOrder: 'DESC'
    });
  };

  useEffect(() => {
    if (searchTerm || filters.propertyType !== 'all') {
      handleSearch();
    }
  }, [filters]);

  // Render method remains largely the same, but with updated filter controls
  return (
    <div className="search-page">
      <div className="hero-search">
        <h1>Find Your Perfect {filters.propertyType === 'car' ? 'Car' : filters.propertyType === 'House' ? 'Home' : 'Property'}</h1>
        <div className="search-bar-container">
          <div className="search-bar">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
              placeholder={`Search for ${filters.propertyType === 'car' ? 'cars' : filters.propertyType === 'House' ? 'houses' : 'properties'}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button className="search-btn" onClick={() => handleSearch()}>
              Search
            </button>
          </div>
          <button
            className="mobile-filter-btn"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <FontAwesomeIcon icon={faFilter} /> Filters
          </button>
        </div>
      </div>

      <div className="search-content">
        {/* Filters Sidebar - Updated to match your API parameters */}
        <div className={`filters-sidebar ${showMobileFilters ? 'mobile-visible' : ''}`}>
          <div className="sidebar-header">
            <h3>Filters</h3>
            <button className="close-filters" onClick={() => setShowMobileFilters(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          <div className="filter-section">
            <h4><FontAwesomeIcon icon={faMoneyBillWave} /> Listing Type</h4>
            <div className="filter-options">
              <label className={`filter-option ${filters.listingType === 'all' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="listingType"
                  value="all"
                  checked={filters.listingType === 'all'}
                  onChange={handleFilterChange}
                />
                All Listings
              </label>
              <label className={`filter-option ${filters.listingType === 'sell' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="listingType"
                  value="sell"
                  checked={filters.listingType === 'sell'}
                  onChange={handleFilterChange}
                />
                For Sale
              </label>
              <label className={`filter-option ${filters.listingType === 'rent' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="listingType"
                  value="rent"
                  checked={filters.listingType === 'rent'}
                  onChange={handleFilterChange}
                />
                For Rent
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4><FontAwesomeIcon icon={filters.propertyType === 'car' ? faCar : faHome} /> Property Type</h4>
            <div className="filter-options">
              <label className={`filter-option ${filters.propertyType === 'all' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="propertyType"
                  value="all"
                  checked={filters.propertyType === 'all'}
                  onChange={handleFilterChange}
                />
                All Types
              </label>
              <label className={`filter-option ${filters.propertyType === 'car' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="propertyType"
                  value="car"
                  checked={filters.propertyType === 'car'}
                  onChange={handleFilterChange}
                />
                Cars
              </label>
              <label className={`filter-option ${filters.propertyType === 'House' ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="propertyType"
                  value="House"
                  checked={filters.propertyType === 'House'}
                  onChange={handleFilterChange}
                />
                Houses
              </label>
            </div>
          </div>

          <div className="filter-section">
            <h4>Price Range</h4>
            <div className="price-range-display">
              ${filters.priceRange[0].toLocaleString()} - ${filters.priceRange[1].toLocaleString()}
            </div>
            <Slider
              range
              min={0}
              max={1000000}
              step={1000}
              value={filters.priceRange}
              onChange={(value) => handleRangeChange('priceRange', value)}
              trackStyle={[{ backgroundColor: '#4a6baf' }]}
              handleStyle={[
                { backgroundColor: '#4a6baf', borderColor: '#4a6baf' },
                { backgroundColor: '#4a6baf', borderColor: '#4a6baf' }
              ]}
            />
          </div>

          <div className="filter-section">
            <h4><FontAwesomeIcon icon={faMapMarkerAlt} /> Location</h4>
            <input
              type="text"
              name="location"
              placeholder="City or neighborhood"
              value={filters.location}
              onChange={handleFilterChange}
              className="location-input"
            />
          </div>

          {filters.propertyType === 'House' && (
            <>
              <div className="filter-section">
                <h4><FontAwesomeIcon icon={faBed} /> Bedrooms</h4>
                <select
                  name="bedrooms"
                  value={filters.bedrooms}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>

              <div className="filter-section">
                <h4><FontAwesomeIcon icon={faBath} /> Bathrooms</h4>
                <select
                  name="bathrooms"
                  value={filters.bathrooms}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>

              <div className="filter-section">
                <h4>House Type</h4>
                <select
                  name="houseType"
                  value={filters.houseType}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Any Type</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Villa">Villa</option>
                  <option value="Condominium">Condominium</option>
                  <option value="Townhouse">Townhouse</option>
                </select>
              </div>

              <div className="filter-section">
                <h4>Area (sq ft)</h4>
                <div className="price-range-display">
                  {filters.areaRange[0]} - {filters.areaRange[1]} sq ft
                </div>
                <Slider
                  range
                  min={0}
                  max={10000}
                  step={100}
                  value={filters.areaRange}
                  onChange={(value) => handleRangeChange('areaRange', value)}
                />
              </div>
            </>
          )}

          {filters.propertyType === 'car' && (
            <>
              <div className="filter-section">
                <h4><FontAwesomeIcon icon={faCar} /> Car Make</h4>
                <input
                  type="text"
                  name="carMake"
                  placeholder="Toyota, Honda, etc."
                  value={filters.carMake}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>

              <div className="filter-section">
                <h4>Car Model</h4>
                <input
                  type="text"
                  name="carModel"
                  placeholder="Camry, Accord, etc."
                  value={filters.carModel}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>

              <div className="filter-section">
                <h4><FontAwesomeIcon icon={faCalendarAlt} /> Year Range</h4>
                <div className="price-range-display">
                  {filters.yearRange[0]} - {filters.yearRange[1]}
                </div>
                <Slider
                  range
                  min={1990}
                  max={new Date().getFullYear()}
                  value={filters.yearRange}
                  onChange={(value) => handleRangeChange('yearRange', value)}
                />
              </div>

              <div className="filter-section">
                <h4>Transmission</h4>
                <select
                  name="transmission"
                  value={filters.transmission}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="automatic">Automatic</option>
                  <option value="manual">Manual</option>
                </select>
              </div>

              <div className="filter-section">
                <h4>Fuel Type</h4>
                <select
                  name="fuelType"
                  value={filters.fuelType}
                  onChange={handleFilterChange}
                  className="filter-select"
                >
                  <option value="">Any</option>
                  <option value="gasoline">Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </div>

              <div className="filter-section">
                <h4>Color</h4>
                <input
                  type="text"
                  name="color"
                  placeholder="Red, Blue, etc."
                  value={filters.color}
                  onChange={handleFilterChange}
                  className="filter-input"
                />
              </div>

              <div className="filter-section">
                <h4>Mileage (km)</h4>
                <div className="price-range-display">
                  {filters.mileageRange[0]} - {filters.mileageRange[1]} km
                </div>
                <Slider
                  range
                  min={0}
                  max={500000}
                  step={1000}
                  value={filters.mileageRange}
                  onChange={(value) => handleRangeChange('mileageRange', value)}
                />
              </div>
            </>
          )}

          <div className="filter-section">
            <h4>Sort By</h4>
            <select
              name="sortBy"
              value={filters.sortBy}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="created_at">Newest</option>
              <option value="price">Price</option>
              {filters.propertyType === 'car' && <option value="year">Year</option>}
              {filters.propertyType === 'car' && <option value="mileage">Mileage</option>}
              {filters.propertyType === 'House' && <option value="bedrooms">Bedrooms</option>}
            </select>
            <select
              name="sortOrder"
              value={filters.sortOrder}
              onChange={handleFilterChange}
              className="filter-select mt-2"
            >
              <option value="DESC">Descending</option>
              <option value="ASC">Ascending</option>
            </select>
          </div>

          <div className="filter-actions">
            <button className="reset-btn" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        {/* Results Section */}
        <div className="results-section">
          <div className="results-header">
            <h2>
              {pagination.total} {pagination.total === 1 ? 'Result' : 'Results'} Found
              {filters.propertyType !== 'all' && (
                <span> for {filters.propertyType === 'car' ? 'Cars' : 'Houses'}</span>
              )}
              {filters.listingType !== 'all' && (
                <span> to {filters.listingType === 'rent' ? 'Rent' : 'Buy'}</span>
              )}
            </h2>
          </div>

          {isLoading ? (
            <div className="loading-results">
              <div className="spinner"></div>
              <p>Searching for properties...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <>
              <div className="results-grid">
                {searchResults.map(item => (
                  <div key={item.id} className="property-card" onClick={() => handleViewDetails(item.id, item.propertyType)}>
                    <div className="card-badge">
                      {item.ForSellRent === 'Rent' ? 'For Rent' : 'For Sale'}
                    </div>
                    <div className="card-image">
                      <img src={`${process.env.REACT_APP_API_URL}/uploads/${item.cover_image}`} alt={item.title} />
                      <div className="property-type-icon">
                        <FontAwesomeIcon icon={item.propertyType === 'car' ? faCar : faHome} />
                      </div>
                    </div>
                    <div className="card-details">
                      <h3>{item.title}</h3>
                      <p className="location">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.location}
                      </p>
                      <p className="price">
                        ${parseFloat(item.price).toLocaleString()}
                        {item.ForSellRent === 'Rent' && <span>/month</span>}
                      </p>

                      {item.propertyType === 'House' && (
                        <div className="property-features">
                          {item.bedrooms && <span><FontAwesomeIcon icon={faBed} /> {item.bedrooms} beds</span>}
                          {item.bathrooms && <span><FontAwesomeIcon icon={faBath} /> {item.bathrooms} baths</span>}
                        </div>
                      )}

                      {item.propertyType === 'car' && (
                        <div className="property-features">
                          {item.make && <span>{item.make}</span>}
                          {item.model && <span>{item.model}</span>}
                          {item.year && <span><FontAwesomeIcon icon={faCalendarAlt} /> {item.year}</span>}
                          {item.mileage && <span><FontAwesomeIcon icon={faCogs} /> {item.mileage.toLocaleString()} km</span>}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </button>
                  <span>Page {pagination.page} of {pagination.totalPages}</span>
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="no-results">
              <img src="/images/no-results.svg" alt="No results" />
              <h3>No properties found</h3>
              <p>Try adjusting your search or filters to find what you're looking for.</p>
              <button className="reset-btn" onClick={resetFilters}>
                Reset All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;