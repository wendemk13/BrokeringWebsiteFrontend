

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditCarPage.css';
import { useTranslation } from 'react-i18next';

const EditCarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState({
    title: '',
    description: '',
    price: '',
    make: '',
    model: '',
    year: '',
    mileage: '',
    color: '',
    condition: 'used',
    transmission: 'automatic',
    fuel_type: 'gasoline',
    cover_image: '',
    additional_images: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [coverImagePreview, setCoverImagePreview] = useState('');
  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/car/${id}`);
        const data = response.data.car;
        setCar({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          make: data.make || '',
          model: data.model || '',
          year: data.year || '',
          mileage: data.mileage || '',
          color: data.color || '',
          condition: data.condition || 'used',
          transmission: data.transmission || 'automatic',
          fuel_type: data.fuel_type || 'gasoline',
          cover_image: data.cover_image || '',
          additional_images: data.additional_images || [],
        });

        if (data.cover_image) {
          setCoverImagePreview(`${process.env.REACT_APP_API_URL}/uploads/${data.cover_image}`);
        }
      } catch (err) {
        console.error('Error fetching car details:', err);
        setError('Failed to load car detail');
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImagePreview(URL.createObjectURL(file));
      setCar((prev) => ({
        ...prev,
        cover_image: file,
      }));
    }
  };

  const handleAddImage = () => {
    if (newImageUrl.trim() && !car.additional_images.includes(newImageUrl)) {
      setCar((prev) => ({
        ...prev,
        additional_images: [...prev.additional_images, newImageUrl],
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index) => {
    setCar((prev) => ({
      ...prev,
      additional_images: prev.additional_images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const formData = new FormData();

      for (const key in car) {
        if (key === 'cover_image' && car.cover_image instanceof File) {
          formData.append('cover_image', car.cover_image);
        } else if (key === 'additional_images') {
          car.additional_images.forEach((img, i) =>
            formData.append(`additional_images[${i}]`, img)
          );
        } else {
          formData.append(key, car[key]);
        }
      }

      await axios.put(`${process.env.REACT_APP_API_URL}/api/car/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSuccess('Car updated successfully!');
      setTimeout(() => navigate('/userprofilepage'), 1500);
    } catch (err) {
      console.error('Error updating car:', err);
      setError(err.response?.data?.message || 'Error updating');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>{t(`Loading car details...`)}</p>
      </div>
    );
  }

  return (
    <div className="edit-car-container">
      <h2>{t(`Edit Car Listing`)}</h2>
      {error && <div className="alert alert-error">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit} className="edit-car-form">
        <div className="form-section">
          <h3>{t(`Basic Information`)}</h3>
          <div className="form-group">
            <label>{t(`Title`)}*</label>
            <input
              type="text"
              name="title"
              value={car.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>{t(`Description`)}*</label>
            <textarea
              name="description"
              value={car.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price* ($)</label>
            <input
              type="number"
              name="price"
              value={car.price}
              onChange={handleChange}
              required
              min="0"
              step="100"
            />
          </div>
        </div>

        <div className="form-section">
          <h3>{t(`Car Details`)}</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Make*</label>
              <input
                type="text"
                name="make"
                value={car.make}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Model*</label>
              <input
                type="text"
                name="model"
                value={car.model}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Year*</label>
              <input
                type="number"
                name="year"
                value={car.year}
                onChange={handleChange}
                required
                min="1900"
                max={new Date().getFullYear() + 1}
              />
            </div>
            <div className="form-group">
              <label>Mileage</label>
              <input
                type="number"
                name="mileage"
                value={car.mileage}
                onChange={handleChange}
                min="0"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Color</label>
              <input
                type="text"
                name="color"
                value={car.color}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Condition</label>
              <select
                name="condition"
                value={car.condition}
                onChange={handleChange}
              >
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="certified">Certified Pre-owned</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Transmission</label>
              <select
                name="transmission"
                value={car.transmission}
                onChange={handleChange}
              >
                <option value="automatic">Automatic</option>
                <option value="manual">Manual</option>
                <option value="semi-automatic">Semi-Automatic</option>
              </select>
            </div>
            <div className="form-group">
              <label>Fuel Type</label>
              <select
                name="fuel_type"
                value={car.fuel_type}
                onChange={handleChange}
              >
                <option value="gasoline">Gasoline</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>{t(`Images`)}</h3>
          <div className="form-group">
            <label>Cover Image</label>
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
              car.cover_image &&
              typeof car.cover_image === "string" && (
                <div className="image-preview">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/uploads/${car.cover_image}`}
                    alt="Main car"
                  />
                </div>
              )
            )}
          </div>
        </div>

          <button
            type="submit"
            style={{ width: "100%" }}
             className="submit-button"
          >
            {t(`Update Car`)}
          </button>
      </form>
    </div>
  );
};

export default EditCarPage;
