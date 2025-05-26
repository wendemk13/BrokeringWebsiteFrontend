
import './ProfileSettings.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  TextField,
  Button,
  Avatar,
  IconButton,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from '@mui/material';
const ProfileSettings = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    address: '',
    profile_image: null
  });
  
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userId = JSON.parse(localStorage.getItem('user')).id;
        setUserId(userId);
        const response = await axios.get(`http://localhost:5000/api/auth/getUser/${userId}`);
        setUser(response.data.user[0]);
        if (response.data.user[0].profile_image) {
          setPreviewImage(`http://localhost:5000/uploads/profile/${response.data.user[0].profile_image}`);
        }
      } catch (err) {
        setError('Failed to fetch user profile');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setUser(prev => ({ ...prev, profile_image: file }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    const formData = new FormData();
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('phone_number', user.phone_number);
    formData.append('address', user.address);
    
    if (user.profile_image) {
      formData.append('profile_image', user.profile_image);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/auth/update/${userId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      setSuccess('Profile updated successfully!');

      // Optionally, update local storage if needed (not in the current code)
      const updatedUser = { ...JSON.parse(localStorage.getItem('user')), ...response.data.updatedUser };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      setTimeout(() => {
        // navigate(`/profile/${userId}`);  // Assuming the user has a profile page
      }, 1500);

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="profile-container">
      <h2>Update Your Profile</h2>
      {/* <div className="form-group">
      <label htmlFor="profile_image">Profile Image</label>
      {previewImage && <img src={previewImage} alt="Profile Preview"  className='profile_image_show'/>}
      <input type="file" name="profile_image" onChange={handleImageChange} />

    </div> */}
    <div className="form-group">
  <label htmlFor="profile_image">Profile Image</label>
  <div className="profile-image-section">
    {previewImage ? (
      <img 
        src={previewImage} 
        alt="Profile Preview" 
        className="profile_image_show" 
        onClick={() => document.getElementById('file-input').click()} // Trigger file input when image is clicked
      />
    ) : (
      <div className="image-placeholder" onClick={() => document.getElementById('file-input').click()}>
        <span>Click to select a profile image</span>
      </div>
    )}
    <input 
      type="file" 
      id="file-input" 
      name="profile_image" 
      onChange={handleImageChange} 
      style={{ display: 'none' }}  // Hide the file input
    />
  </div>
</div>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="username">Username</label>
      <input type="text" name="username" value={user.username} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="email">Email</label>
      <input type="email" name="email" value={user.email} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="first_name">First Name</label>
      <input type="text" name="first_name" value={user.first_name} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="last_name">Last Name</label>
      <input type="text" name="last_name" value={user.last_name} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="phone_number">Phone Number</label>
      <input type="text" name="phone_number" value={user.phone_number} onChange={handleChange} />
    </div>

    <div className="form-group">
      <label htmlFor="address">Address</label>
      <input type="text" name="address" value={user.address} onChange={handleChange} />
    </div>

    

    <button type="submit">Save Changes</button>
  </form>

  

  <Box sx={{ p: 3 }}>
      {/* Security Section */}
      <Card sx={{ mt: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Security Settings
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                <Link to='/ChangePassword'>
                Change Password</Link>
              </Button>
            </Grid>
            {/* <Grid item xs={12} sm={6}>
              <Button variant="outlined" fullWidth>
                Two-Factor Authentication
              </Button>
            </Grid> */}
          </Grid>
        </CardContent>
      </Card>
    </Box>
</div>
);
};

export default ProfileSettings;