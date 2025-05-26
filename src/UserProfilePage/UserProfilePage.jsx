import React, { useEffect, useState } from 'react';
import './UserProfilePage.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ListingsTable from './ListingsTable';
import { useTranslation } from 'react-i18next';


const UserProfilePage = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState([]);
    // const navigate = useNavigate();
    const {t,i18n}=useTranslation();
    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const user = JSON.parse(localStorage.getItem("user")); // Parse the user data from localStorage
                if (!user || !user.id) {
                    console.error('User ID not found');
                    return;
                }
                const id = user.id; // Get the userId from the parsed object
                const response = await axios.get(`http://localhost:5000/api/my-listings?userId=${id}`);
                setListings(response.data);
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchListings();
    }, []);

    // const toggleSidebar = () => {
    //     setIsSidebarOpen(!isSidebarOpen);
    // };

    // const handleEditClick = (listingId, propertyType) => {
    //     if (!listingId || !propertyType) {
    //         console.error('Invalid listing data');
    //         return; // Optionally show a message to the user
    //     }

    //     // Redirect to the correct edit page based on listing type (house or car)
    //     if (propertyType === 'House') {
    //         navigate(`/edit-house/${listingId}`);
    //     } else if (propertyType === 'Car') {
    //         navigate(`/edit-car/${listingId}`);
    //     } else {
    //         console.error('Unknown listing type');
    //     }
    // };

    console.log(listings);


// const handleDeleteClick = async (id, propertyType) => {
//   try {
//     let url = '';
//     if (propertyType === 'House') {
//       url = `http://localhost:5000/api/house/${id}`;
//     } else if (propertyType === 'Car') {
//       url = `http://localhost:5000/api/car/${id}`;
//     } else {
//       console.error('Unknown property type');
//       return;
//     }

//     const confirmDelete = window.confirm('Are you sure you want to delete this listing?');
//     if (!confirmDelete) return;

//     const response = await axios.delete(url);
//     alert(response.data.message);

//     // Update the list in UI
//     setListings(prevListings => prevListings.filter(listing => listing.id !== id));
//   } catch (error) {
//     console.error('Error deleting listing:', error);
//     alert('Failed to delete listing.');
//   }
// };
const [user_id,setuser_id]=useState();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user")); 
 if (!user || !user.id) {
                    console.error('User ID not found');
                    return;
                }
                                const id = user.id; 
                                setuser_id(id);

    },[])


    return (
        <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''} container`}>
            <div className="dashboard_sidebar">
                <Link to='/userprofilepage' className="nav-item active">
                    <i></i>
                    <span>{t(`Dashboard`)}</span>
                </Link>
                <Link to='/user/car' className="nav-item">
                    <i></i>
                    <span>{t(`Cars`)}</span>
                </Link>
                <Link to='/user/House' className="nav-item">
                    <i></i>
                    <span>{t(`Houses`)}</span>
                </Link>
                <Link to='/user/usermessages' className="nav-item">
                    <i></i>
                    <span>{t(`Messages`)}</span>
                </Link>
                 <Link to={`/UserPaymentHistory/${user_id}`} className="nav-item">
                                <i></i>
                                <span>{t(`Transaction History`)}</span>
                            </Link>
                
                <Link to='/UserSetting' className="nav-item">
                    <i></i>
                    <span>{t(`Settings`)}</span>
                </Link>
                {/* <Link to='/ContactOwner' className="nav-item">
                    <i></i>
                    <span>{t(`Contact Owner`)}</span>
                </Link> */}
            </div>

            <div className="main-content">
                <div className="dashboard_header">
                    <h1>{t(`User Dashboard`)}</h1>
                    {/* <div className="dashboard_user-actions">
                        <input type="text" className="dashboard_search-bar" placeholder="Search listings..." />
                        <button className="dashboard_notification-btn">
                            🔔
                            <span className="dashboard_notification-badge">3</span>
                        </button>
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" className="dashboard_profile-pic" alt="Profile" />
                    </div> */}

                    
                </div>
<div className='addcar-addhouse'>
    <Link to='/addproperty' className="add-property-link">
        <i className="fas fa-plus"></i> {t(`Add Property`)}
    </Link>
    <Link to='/addcar' className="add-property-link">
        <i className="fas fa-plus"></i> {t(`Add Car`)}
    </Link>
</div>
                {loading ? (
                    <p>{t(`Loading listings...`)}</p>
                ) : (
                   <ListingsTable/>
                )}
            </div>
        </div>
    );
};

export default UserProfilePage;
