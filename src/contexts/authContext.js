// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Check for existing user on initial load
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user'));
                if (!storedUser) {
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/getUser/${storedUser.id}`);
                const userProfile = response.data.user[0];
                setUser(userProfile);

                if (userProfile.profile_image) {
                    const imageUrl = `${process.env.REACT_APP_API_URL}/uploads/profile/${userProfile.profile_image}`;
                    setProfileImage(imageUrl);
                }
            } catch (err) {
                console.error('Failed to fetch user profile:', err);
                setError('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    const login = async (userData) => {
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        if (userData.profile_image) {
            setProfileImage(`${process.env.REACT_APP_API_URL}/uploads/profile/${userData.profile_image}`);
        }
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        setUser(null);
        setProfileImage(null);
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{
            user,
            profileImage,
            loading,
            error,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);