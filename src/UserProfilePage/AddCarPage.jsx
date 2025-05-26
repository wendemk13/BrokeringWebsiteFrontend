// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './AddCarPage.css'; // You should create a specific CSS file for cars

// const AddCar = () => {
//     const navigate = useNavigate();
    
//     // Properly get user data from localStorage
//     const user = JSON.parse(localStorage.getItem('user'));
//     const authToken = localStorage.getItem('authToken');
//     const [car, setCar] = useState({
//         title: '',
//         description: '',
//         price: '',
//         make: '',
//         model: '',
//         year: '',
//         mileage: '',
//         color: '',
//         transmission: 'automatic', // matches enum
//         fuel_type: 'petrol', // matches enum
//         seller_id: user?.id || null
//     });
    
//     const [imageFile, setImageFile] = useState(null);
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const [isSubmitting, setIsSubmitting] = useState(false);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCar(prev => ({ ...prev, [name]: value }));
//     };

//     const handleImageChange = (e) => {
//         setImageFile(e.target.files[0]);
//     };

//     const validateForm = () => {
//         if (!imageFile) {
//             setError('Cover image is required');
//             return false;
//         }
        
//         if (!car.seller_id) {
//             setError('You must be logged in to list a car');
//             return false;
//         }
        
//         if (!car.title || !car.description || !car.price || !car.make || !car.model || !car.year) {
//             setError('Please fill in all required fields');
//             return false;
//         }
        
//         if (isNaN(car.price) || car.price <= 0) {
//             setError('Price must be a positive number');
//             return false;
//         }

//         if (isNaN(car.year) || car.year < 1900 || car.year > new Date().getFullYear() + 1) {
//             setError('Please enter a valid year');
//             return false;
//         }
        
//         return true;
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     setError('');
//     //     setSuccess('');
        
//     //     if (!validateForm()) return;
        
//     //     setIsSubmitting(true);
        
//     //     try {
//     //         const formData = new FormData();
            
//     //         // Append all car data
//     //         Object.keys(car).forEach(key => {
//     //             if (car[key] !== '' && car[key] !== null) {
//     //                 formData.append(key, car[key]);
//     //             }
//     //         });
            
//     //         // Append the image file
//     //         formData.append('cover_image', imageFile);
            
//     //         const response = await axios.post('${process.env.REACT_APP_API_URL}/api/cars', formData, {
//     //             headers: {
//     //                 'Content-Type': 'multipart/form-data',
//     //                 'Authorization': `Bearer ${authToken}`
//     //             }
//     //         });
            
//     //         setSuccess('Car listing created successfully!');
//     //         setTimeout(() => navigate('/userprofilepage'), 1500);
//     //     } catch (error) {
//     //         console.error('Error creating car:', error);
//     //         setError(error.response?.data?.message || {error});
//     //     } finally {
//     //         setIsSubmitting(false);
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError('');
//         setSuccess('');
        
//         if (!validateForm()) return;
        
//         setIsSubmitting(true);
        
//         try {
//             const formData = new FormData();
            
//             // Append all car data
//             Object.keys(car).forEach(key => {
//                 if (car[key] !== '' && car[key] !== null) {
//                     formData.append(key, car[key]);
//                 }
//             });
//             // In your handleSubmit function:
// formData.append('price', parseFloat(car.price).toFixed(2));
//             // Append the image file
//             formData.append('cover_image', imageFile);
            
//             const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/car`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${authToken}`
//                 }
//             });
            
//             setSuccess('Car listing created successfully!');
//             setTimeout(() => navigate('/userprofilepage'), 1500);
//         } catch (error) {
//             console.error('Error creating car:', error);
            
//             // FIXED: Properly handle error response
//             const errorMessage = error.response?.data?.message 
//                 || error.response?.data?.error 
//                 || error.message 
//                 || 'Error creating car listing';
            
//             setError(errorMessage.toString()); // Ensure it's a string
//         } finally {
//             setIsSubmitting(false);
//         }
//     };
//     return (
//         <div className="add-car-container">
//             <h2>Add New Car Listing</h2>
            
//             {error && <div className="alert alert-error">{error}</div>}
//             {success && <div className="alert alert-success">{success}</div>}

//             <form onSubmit={handleSubmit} className="add-car-form" encType="multipart/form-data">
//                 <div className="form-section">
//                     <h3>Basic Information</h3>
//                     <div className="form-group">
//                         <label>Title*</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={car.title}
//                             onChange={handleChange}
//                             required
//                             placeholder="e.g., 2019 Toyota Camry XLE"
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Description*</label>
//                         <textarea
//                             name="description"
//                             value={car.description}
//                             onChange={handleChange}
//                             required
//                             rows="4"
//                             placeholder="Describe the car's features, condition, and special details..."
//                         />
//                     </div>

//                     <div className="form-group">
//                         <label>Price* ($)</label>
//                         <input
//                             type="number"
//                             name="price"
//                             value={car.price}
//                             onChange={handleChange}
//                             required
//                             min="0"
//                             step="100"
//                         />
//                     </div>
//                 </div>

//                 <div className="form-section">
//                     <h3>Car Details</h3>
//                     <div className="form-row">
//                         {/* <div className="form-group">
//                             <label>Make*</label>
//                             <input
//                                 type="text"
//                                 name="make"
//                                 value={car.make}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div> */}
//                         <div className="form-group">
//     <label>Make*</label>
//     <select
//         name="make"
//         value={car.make}
//         onChange={handleChange}
//         required
//     >
//         <option value="">-- Select Car Make --</option>
//         <option value="Toyota">Toyota</option>
//         <option value="Hyundai">Hyundai</option>
//         <option value="Suzuki">Suzuki</option>
//         <option value="Kia">Kia</option>
//         <option value="Nissan">Nissan</option>
//         <option value="Isuzu">Isuzu</option>
//         <option value="Mitsubishi">Mitsubishi</option>
//         <option value="Chevrolet">Chevrolet</option>
//         <option value="Ford">Ford</option>
//         <option value="Daewoo">Daewoo</option>
//     </select>
// </div>


//                         <div className="form-group">
//                             <label>Model*</label>
//                             <input
//                                 type="text"
//                                 name="model"
//                                 value={car.model}
//                                 onChange={handleChange}
//                                 required
//                             />
//                         </div>
//                     </div>

//                     <div className="form-row">
//                         <div className="form-group">
//                             <label>Year*</label>
//                             <input
//                                 type="number"
//                                 name="year"
//                                 value={car.year}
//                                 onChange={handleChange}
//                                 required
//                                 min="1900"
//                                 max={new Date().getFullYear() + 1}
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Mileage</label>
//                             <input
//                                 type="number"
//                                 name="mileage"
//                                 value={car.mileage}
//                                 onChange={handleChange}
//                                 min="0"
//                                 placeholder="e.g., 45000"
//                             />
//                         </div>
//                     </div>

//                     <div className="form-row">
//                         <div className="form-group">
//                             <label>Color</label>
//                             <input
//                                 type="text"
//                                 name="color"
//                                 value={car.color}
//                                 onChange={handleChange}
//                                 placeholder="e.g., Silver"
//                             />
//                         </div>

//                         <div className="form-group">
//                             <label>Condition</label>
//                             <select
//                                 name="condition"
//                                 value={car.condition}
//                                 onChange={handleChange}
//                             >
//                                 <option value="new">New</option>
//                                 <option value="used">Used</option>
//                                 <option value="certified">Certified Pre-owned</option>
//                             </select>
//                         </div>
//                     </div>

//                     <div className="form-row">
//                         <div className="form-group">
//                             <label>Transmission</label>
//                             <select
//                                 name="transmission"
//                                 value={car.transmission}
//                                 onChange={handleChange}
//                             >
//                                 <option value="automatic">Automatic</option>
//                                 <option value="manual">Manual</option>
//                                 <option value="semi-automatic">Semi-Automatic</option>
//                             </select>
//                         </div>

//                         <div className="form-group">
//                             <label>Fuel Type</label>
//                             <select
//                                 name="fuel_type"
//                                 value={car.fuel_type}
//                                 onChange={handleChange}
//                             >
//                                 <option value="gasoline">Gasoline</option>
//                                 <option value="diesel">Diesel</option>
//                                 <option value="electric">Electric</option>
//                                 <option value="hybrid">Hybrid</option>
//                                 <option value="other">Other</option>
//                             </select>
//                         </div>
//                     </div>
//                 </div>
// {/* Transmission Field */}
// <div className="form-group">
//     <label>Transmission</label>
//     <select
//         name="transmission"
//         value={car.transmission}
//         onChange={handleChange}
//     >
//         <option value="automatic">Automatic</option>
//         <option value="manual">Manual</option>
//     </select>
// </div>

// {/* Fuel Type Field */}
// <div className="form-group">
//     <label>Fuel Type</label>
//     <select
//         name="fuel_type"
//         value={car.fuel_type}
//         onChange={handleChange}
//     >
//         <option value="petrol">Petrol</option>
//         <option value="diesel">Diesel</option>
//         <option value="electric">Electric</option>
//         <option value="hybrid">Hybrid</option>
//     </select>
// </div>
//                 <div className="form-section">
//                     <h3>Cover Image</h3>
//                     <div className="form-group">
//                         <label>Upload Cover Image*</label>
//                         <input
//                             type="file"
//                             name="cover_image"
//                             onChange={handleImageChange}
//                             accept="image/*"
//                             required
//                         />
//                         {imageFile && (
//                             <div className="image-preview">
//                                 <img src={URL.createObjectURL(imageFile)} alt="Car preview" />
//                             </div>
//                         )}
//                     </div>
//                 </div>

//                 <div className="form-actions">
//                     <button 
//                         type="button" 
//                         onClick={() => navigate(-1)} 
//                         className="cancel-btn"
//                         disabled={isSubmitting}
//                     >
//                         Cancel
//                     </button>
//                     <button 
//                         type="submit" 
//                         className="submit-btn"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? 'Creating...' : 'Create Car Listing'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AddCar;





import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AddCarPage.css'; // You should create a specific CSS file for cars
import carModels from '../carData.js';
import { useTranslation } from "react-i18next"; // <-- added this import
const AddCar = () => {
    const navigate = useNavigate();
    
    // Properly get user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    const authToken = localStorage.getItem('authToken');
    const [car, setCar] = useState({
        title: '',
        description: '',
        price: '',
        make: '',
        model: '',
        year: '',
        mileage: '',
        color: '',
        condition:'',
        ForSellRent:'Sell',
        transmission: 'automatic', // matches enum
        fuel_type: 'petrol', // matches enum
        seller_id: user?.id || null
    });
    
    const [imageFile, setImageFile] = useState(null);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar(prev => ({ ...prev, [name]: value }));
        // const { name, value } = e.target;
        // setCar(prev => ({
        //     ...prev,
        //     [name]: value,
        //     model: name === 'make' ? '' : prev.model  
        // }));
    };

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };
    const handlemodelChange = (e) => {
        const { name, value } = e.target;
        setCar(prev => ({
            ...prev,
            [name]: value,
            model:  value  
        }));
    };
    const validateForm = () => {
        if (!imageFile) {
            setError('Cover image is required');
            return false;
        }
        
        if (!car.seller_id) {
            setError('You must be logged in to list a car');
            return false;
        }
        
        if (!car.title || !car.description || !car.price || !car.make || !car.model || !car.year) {
            setError('Please fill in all required fields');
            return false;
        }
        
        if (isNaN(car.price) || car.price <= 0) {
            setError('Price must be a positive number');
            return false;
        }

        if (isNaN(car.year) || car.year < 1900 || car.year > new Date().getFullYear() + 1) {
            setError('Please enter a valid year');
            return false;
        }
        
        return true;
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setError('');
    //     setSuccess('');
        
    //     if (!validateForm()) return;
        
    //     setIsSubmitting(true);
        
    //     try {
    //         const formData = new FormData();
            
    //         // Append all car data
    //         Object.keys(car).forEach(key => {
    //             if (car[key] !== '' && car[key] !== null) {
    //                 formData.append(key, car[key]);
    //             }
    //         });
            
    //         // Append the image file
    //         formData.append('cover_image', imageFile);
            
    //         const response = await axios.post('${process.env.REACT_APP_API_URL}/api/cars', formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Bearer ${authToken}`
    //             }
    //         });
            
    //         setSuccess('Car listing created successfully!');
    //         setTimeout(() => navigate('/userprofilepage'), 1500);
    //     } catch (error) {
    //         console.error('Error creating car:', error);
    //         setError(error.response?.data?.message || {error});
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        
        if (!validateForm()) return;
        
        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            
            // Append all car data
            Object.keys(car).forEach(key => {
                if (car[key] !== '' && car[key] !== null) {
                    formData.append(key, car[key]);
                }
            });
            // In your handleSubmit function:
formData.append('price', parseFloat(car.price).toFixed(2));
            // Append the image file
            formData.append('cover_image', imageFile);
            
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/car`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                }
            });
            
            setSuccess('Car listing created successfully!');
            setTimeout(() => navigate('/userprofilepage'), 1500);
        } catch (error) {
            console.error('Error creating car:', error);
            
            // FIXED: Properly handle error response
            const errorMessage = error.response?.data?.message 
                || error.response?.data?.error 
                || error.message 
                || 'Error creating car listing';
            
            setError(errorMessage.toString()); // Ensure it's a string
        } finally {
            setIsSubmitting(false);
        }
    };
    const {t,i18n}=useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    return (
        <div className="add-car-container">
            <h2>{t(`Add New Car Listing`)}</h2>
            
            {error && <div className="alert alert-error">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}

            <form onSubmit={handleSubmit} className="add-car-form" encType="multipart/form-data">
                <div className="form-section">
                    <h3>{t(`Basic Information`)}</h3>
                    <div className="form-group">
                        <label>Title*</label>
                        <input
                            type="text"
                            name="title"
                            value={car.title}
                            onChange={handleChange}
                            required
                            placeholder="e.g., 2019 Toyota Camry XLE"
                        />
                    </div>

                    <div className="form-group">
                        <label>Description*</label>
                        <textarea
                            name="description"
                            value={car.description}
                            onChange={handleChange}
                            required
                            rows="4"
                            placeholder="Describe the car's features, condition, and special details..."
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
                        {/* <div className="form-group">
                            <label>Make*</label>
                            <input
                                type="text"
                                name="make"
                                value={car.make}
                                onChange={handleChange}
                                required
                            />
                        </div> */}
                        <div className="form-group">
    <label>Make*</label>
    <select
        name="make"
        value={car.make}
        onChange={handleChange}
        required
    >
        <option value="">-- Select Car Make --</option>
        <option value="Toyota">Toyota</option>
        <option value="Hyundai">Hyundai</option>
        <option value="Suzuki">Suzuki</option>
        <option value="Kia">Kia</option>
        <option value="Nissan">Nissan</option>
        <option value="Isuzu">Isuzu</option>
        <option value="Mitsubishi">Mitsubishi</option>
        <option value="Chevrolet">Chevrolet</option>
        <option value="Ford">Ford</option>
        <option value="Daewoo">Daewoo</option>
    </select>
</div>


                        {/* <div className="form-group">
                            <label>Model*</label>
                            <input
                                type="text"
                                name="model"
                                value={car.model}
                                onChange={handleChange}
                                required
                            />
                        </div> */}

<div className="form-group">
    <label>Model*</label>
    <select
        name="model"
        value={car.model}
        onChange={handlemodelChange}
        required
        disabled={!car.make}
    >
        <option value="">Select Model</option>
        {car.make && carModels[car.make]?.map((modelOption) => (
            <option key={modelOption} value={modelOption}>
                {modelOption}
            </option>
        ))}
    </select>
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
                                placeholder="e.g., 45000"
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
                                placeholder="e.g., Silver"
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
{/* Transmission Field */}
{/* <div className="form-group">
    <label>Transmission</label>
    <select
        name="transmission"
        value={car.transmission}
        onChange={handleChange}
    >
        <option value="automatic">Automatic</option>
        <option value="manual">Manual</option>
    </select>
</div> */}

{/* Fuel Type Field
<div className="form-group">
    <label>Fuel Type</label>
    <select
        name="fuel_type"
        value={car.fuel_type}
        onChange={handleChange}
    >
        <option value="petrol">Petrol</option>
        <option value="diesel">Diesel</option>
        <option value="electric">Electric</option>
        <option value="hybrid">Hybrid</option>
    </select>
</div> */}
 <div className="form-group">
    <label>ForSellRent</label>
    <select
        name="ForSellRent"  // Changed from "status" to "ForSellRent"
        value={car.ForSellRent}
        onChange={handleChange}
    >
        <option value="Sell">Sell</option>
        <option value="Rent">Rent</option>
    </select>
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
                                <img src={URL.createObjectURL(imageFile)} alt="Car preview" />
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
                        {isSubmitting ? <>{t('Creating...')}</> : <>{t('Create Car Listing')}</>}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCar;