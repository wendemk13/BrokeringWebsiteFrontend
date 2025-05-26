import React from 'react';

function Modal({ formData, handleInputChange, handleSubmit, closeModal }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{formData.id ? 'Edit Listing' : 'Add New Listing'}</h2>
          <button className="close-modal" onClick={closeModal}>&times;</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="listingType">Listing Type</label>
            <select 
              id="listingType" 
              className="form-control" 
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Select type</option>
              <option value="house">House</option>
              <option value="car">Car</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="listingTitle">Title</label>
            <input 
              type="text" 
              id="listingTitle" 
              className="form-control" 
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="e.g., 3-Bedroom Villa" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="listingPrice">Price ($)</label>
            <input 
              type="number" 
              id="listingPrice" 
              className="form-control" 
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="e.g., 350000" 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="listingImage">Image URL</label>
            <input 
              type="text" 
              id="listingImage" 
              className="form-control" 
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              placeholder="Paste image URL"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={closeModal}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {formData.id ? 'Update' : 'Save'} Listing
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal;