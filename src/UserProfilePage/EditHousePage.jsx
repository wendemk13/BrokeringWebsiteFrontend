import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditHousePage.css';
import { useTranslation } from 'react-i18next';

const EditHousePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [house, setHouse] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    address: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0,
    type: '',
    status: '',
    propertyType: 'House',
    ForSellRent: 'sell',
    cover_image: '',
    approval_status:'',
    additional_images: []
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');



  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/house/${id}`);
        const data = response.data.data;

        setHouse({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '0.00',
          location: data.location || '',
          address: data.address || '',
          bedrooms: data.bedrooms || 0,
          bathrooms: data.bathrooms || 0,
          area: data.area || 0,
          type: data.type || '',
          status: data.status || 'Available',
          propertyType: data.propertyType || 'House',
          ForSellRent: data.ForSellRent || 'Sell',
          cover_image: data.cover_image || '',
        approval_status:data.approval_status||'pending',
          additional_images: data.additional_images || []
        });

        if (data.cover_image) {
          setCoverImagePreview(`${process.env.REACT_APP_API_URL}/uploads${data.cover_image}`);
        }
      } catch (err) {
        console.error('Error fetching house details:', err);
        setError('Failed to load house details.');
      } finally {
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHouse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setHouse(prev => ({
      ...prev,
      [name]: value ? parseInt(value) : 0
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
      setHouse(prev => ({
        ...prev,
        cover_image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();
      
      // Append all fields
      formData.append('title', house.title);
      formData.append('description', house.description);
      formData.append('price', house.price);
      formData.append('location', house.location);
      formData.append('address', house.address);
      formData.append('bedrooms', house.bedrooms);
      formData.append('bathrooms', house.bathrooms);
      formData.append('area', house.area);
      formData.append('type', house.type);
      formData.append('status', house.status);
      formData.append('propertyType', house.propertyType);
      formData.append('ForSellRent', house.ForSellRent);
      formData.append('approval_status', 'pending');


      // Handle cover image
      if (house.cover_image instanceof File) {
        formData.append('cover_image', house.cover_image);
      } else if (typeof house.cover_image === 'string') {
        formData.append('cover_image', house.cover_image);
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/api/house/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSuccess('House updated successfully!');
      setTimeout(() => navigate('/userprofilepage'), 1500);
    } catch (err) {
      console.error('Error updating house:', err);
      setError(err.response?.data?.message || 'Error updating house listing');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t(`Loading house details...`)}</p>
      </div>
    );
  }

  return (
    <div className="edit-house-container">
      <h2>{t(`Edit House Listing`)}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="edit-house-form">
        <div className="form-section">
          <h3>{t(`Basic Information`)}</h3>
          <div className="form-group">
            <label>Title*</label>
            <input
              type="text"
              name="title"
              value={house.title}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={house.description}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Price* ($)</label>
              <input
                type="number"
                name="price"
                value={house.price}
                onChange={handleChange}
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Listing Type*</label>
              <select
                name="ForSellRent"
                value={house.ForSellRent}
                onChange={handleChange}
                required
              >
                <option value="Sell">For Sale</option>
                <option value="Rent">For Rent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>{t(`Location Details`)}</h3>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={house.location}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>{t(`Address`)}</label>
            <input
              type="text"
              name="address"
              value={house.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>{t(`House Specifications`)}</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Bedrooms</label>
              <input
                type="number"
                name="bedrooms"
                value={house.bedrooms}
                onChange={handleNumberChange}
                min="0"
              />
            </div>
            
            <div className="form-group">
              <label>Bathrooms</label>
              <input
                type="number"
                name="bathrooms"
                value={house.bathrooms}
                onChange={handleNumberChange}
                min="0"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>Area (sq ft)</label>
            <input
              type="number"
              name="area"
              value={house.area}
              onChange={handleNumberChange}
              min="0"
            />
          </div>
          
          <div className="form-group">
            <label>{t(`Property Type`)}</label>
            <select
              name="propertyType"
              value={house.propertyType}
              onChange={handleChange}
            >
              <option value="House">House</option>
              <option value="Apartment">Apartment</option>
              <option value="Condo">Condo</option>
              <option value="Townhouse">Townhouse</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Type</label>
            <input
              type="text"
              name="type"
              value={house.type}
              onChange={handleChange}
            />
          </div>
          
          <div className="form-group">
            <label>Status</label>
            <input
              type="text"
              name="status"
              value={house.status}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="form-section">
          <h3>{t(`Images`)}</h3>
          <div className="form-group">
            <label>{t(`Cover Image`)}</label>
            <input
              type="file"
              name="cover_image"
              accept="image/*"
              onChange={handleFileChange}
            />
            {coverImagePreview ? (
              <div className="image-preview">
                <img src={coverImagePreview} alt="Cover Preview" />
              </div>
            ) : (
              house.cover_image && (
                <div className="image-preview">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads${house.cover_image}`}
                    alt="Current Cover"
                  />
                </div>
              )
            )}
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">
            {t(`Update House Listing`)}
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditHousePage;