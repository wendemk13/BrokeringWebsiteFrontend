import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddProperty.css';
import { useTranslation } from "react-i18next"; // <-- added this import

const AddProperty = () => {

    const navigate = useNavigate();
    const userString = localStorage.getItem('user');
const user = userString ? JSON.parse(userString) : null;
const sellerId = user?.id;


const {t,i18n}=useTranslation();
const changeLanguage = (lng) => {
  i18n.changeLanguage(lng);
};
    const [property, setProperty] = useState({
        title: '',
        description: '',
        price: '',
        location: '',
        address: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        type: 'House',
        status: 'available',
        propertyType: 'House',
        ForSellRent:'Sell',
        seller_id: sellerId || null    });
    
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProperty(prev => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const validateForm = () => {
        // Only validate the image file (keep it required)
        if (!imageFile) {
            setError('Cover image is required');
            return false;
        }
        
        // Optional: Validate price format if provided
        if (property.price && (isNaN(property.price) || property.price <= 0)) {
            setError('Price must be a positive number');
            return false;
        }
        if (!property.seller_id) {
            setError('You must be logged in to list a property');
            return false;
        }
        
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            
            // Append all property data (only if they have values)
            Object.keys(property).forEach(key => {
                if (property[key] !== '') {
                    formData.append(key, property[key]);
                }
            });
            
            // Append the image file
            formData.append('cover_image', imageFile);
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/house`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            setSuccess('Property listing created successfully!');
            setTimeout(() => navigate('/userprofilepage'), 1500);
        } catch (error) {
            console.error('Error creating property:', error);
            setError(error.response?.data?.message || {error});
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-property-container">
            <h2>{t(`Add New Property Listing`)}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="add-property-form" encType="multipart/form-data">
                <div className="form-section">
                    <h3>{t(`Basic Information`)}</h3>
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={property.title}
                            onChange={handleChange}
                            placeholder="e.g., Beautiful 3-Bedroom Family Home"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={property.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe the property's features, condition, and special details..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Price ($)</label>
                        <input
                            type="number"
                            name="price"
                            value={property.price}
                            onChange={handleChange}
                            min="0"
                            step="1000"
                            placeholder="Enter price"
                        />
                    </div>
                </div>

                <div className="form-section">
                    <h3>{t(`Property Details`)}</h3>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={property.location}
                                onChange={handleChange}
                                placeholder="e.g., New York"
                            />
                        </div>

                        <div className="form-group">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                value={property.address}
                                onChange={handleChange}
                                placeholder="e.g., 123 Main St"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Property Type</label>
                            <select
                                name="type"
                                value={property.type}
                                onChange={handleChange}
                            >
                                <option value="house">House</option>
                                <option value="apartment">Apartment</option>
                                <option value="villa">Villa</option>
                                <option value="condo">Condo</option>
                            </select>
                        </div>

                         {/* <div className="form-group">
                            <label>ForSellRent</label>
                            <select
                                name="status"
                                value={property.ForSellRent}
                                onChange={handleChange}
                            >
                                <option value="Sell">Sell</option>
                                <option value="Rent">Rent</option>
                            </select>
                        </div>  */}
                        <div className="form-group">
    <label>ForSellRent</label>
    <select
        name="ForSellRent"  // Changed from "status" to "ForSellRent"
        value={property.ForSellRent}
        onChange={handleChange}
    >
        <option value="Sell">Sell</option>
        <option value="Rent">Rent</option>
    </select>
</div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Bedrooms</label>
                            <input
                                type="number"
                                name="bedrooms"
                                value={property.bedrooms}
                                onChange={handleChange}
                                min="0"
                                step="1"
                                placeholder="Enter number"
                            />
                        </div>

                        <div className="form-group">
                            <label>Bathrooms</label>
                            <input
                                type="number"
                                name="bathrooms"
                                value={property.bathrooms}
                                onChange={handleChange}
                                min="0"
                                step="0.5"
                                placeholder="Enter number"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Area (sq ft)</label>
                        <input
                            type="number"
                            name="area"
                            value={property.area}
                            onChange={handleChange}
                            min="0"
                            placeholder="Enter area"
                        />
                    </div>

                    {/* <div className="form-group">
                        <label>Property Type Category</label>
                        <input
                            type="text"
                            name="propertyType"
                            value={property.propertyType}
                            onChange={handleChange}
                            placeholder="e.g., Residential, Commercial"
                        />
                    </div> */}
                </div>

                <div className="form-section">
                    <h3>{t(`Cover Image`)}</h3>
                    <div className="form-group">
                        <label>{t(`Upload Cover Image`)}*</label>
                        <input
                            type="file"
                            name="cover_image"
                            onChange={handleImageChange}
                            accept="image/*"
                            required
                        />
                        {imageFile && (
                            <div className="image-preview">
                                <img src={URL.createObjectURL(imageFile)} alt="Property preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="form-actions">
                    <button 
                        type="button" 
                        onClick={() => navigate(-1)} 
                        className="cancel-btn"
                        disabled={isSubmitting}
                    >
                        {t(`Cancel`)}
                    </button>
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? <>{t('Creating...')}</> : <>{t('Create Property Listing')}</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProperty;