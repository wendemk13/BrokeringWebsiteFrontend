

// import React, { useState, useEffect } from 'react';
// import ApprovalListings from './ApprovalListings';
// import Transactions from './Transactions';
// import axios from 'axios'
// import { Link } from 'react-router-dom';
// import './MainContent.css'
// function MainContent() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   let [totalPendings,settotalPendings]=useState();
//     let [totalListing,settotalListing]=useState();
//     let [totalUsers,settotalUsers]=useState();
//  const [totalTransactions, setTotalTransactions] = useState(0); // Initialize with 0
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);        


//   useEffect(() => {
//     document.body.classList.toggle("dark-mode", isDarkMode);
//   }, [isDarkMode]);

//   const handleDarkModeToggle = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   useEffect(() => {
//   const fetchPendingListings = async () => {
//     try {
//       const response = await axios.get('${process.env.REACT_APP_API_URL}/api/approval/getPendingListings');
      
//        totalPendings=response.data.pendingCars.length+response.data.pendingHouses.length;
// console.log("totalPendings",totalPendings);
// settotalPendings(totalPendings)
//     } catch (err) {
//       console.log(err)
//     }
//   };
//   const fetchListing = async () => {
//     try {
//       const response = await axios.get('${process.env.REACT_APP_API_URL}/api/totallistings');
      
//        totalListing=response.data.listings.length
//       console.log(response.data.listings.length)
// console.log("total listing",totalListing);
// settotalListing(totalListing)
//     } catch (err) {
//       console.log(err)
//     }
//   };

//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('${process.env.REACT_APP_API_URL}/api/auth/getAllUsers');
      
//        totalUsers=response.data.users.length
//       console.log(response.data.users.length)
// console.log("total users",totalUsers);
// settotalUsers(totalUsers)
//     } catch (err) {
//       console.log(err)
//     }
//   };
// const fetchTransactions = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get('${process.env.REACT_APP_API_URL}/api/payment/AllTransactions');
      
//       // Calculate total amount by summing all transaction amounts
//       const totalAmount = response.data.transactions.reduce(
//         (sum, transaction) => sum + Number(transaction.amount),
//         0 // Initial value
//       );

//       console.log("Transaction count:", response.data.transactions.length);
//       console.log("Total amount:", totalAmount);
      
//       setTotalTransactions(totalAmount);
//     } catch (err) {
//       console.error("Fetch error:", err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//       fetchTransactions();

//   fetchUser();
//   fetchListing();
//   fetchPendingListings();
// }, [totalPendings]);

//   return (
//     <div>
//       <div className="main-content">
//         <div className="top-nav">
//           <div className="search-bar">
//             <i className="fas fa-search"></i>
//             <input type="text" placeholder="Search..." />
//           </div>

//           <h1 style={{ color: "white" }}>Welcome To Admin Dashboard</h1>

//           <div className="user-actions">
//             <div className="notification-bell">
//               <i className="fas fa-bell"></i>
//               <span className="notification-badge">5</span>
//             </div>

//             <label className="dark-mode-toggle">
//               <input type="checkbox" checked={isDarkMode} onChange={handleDarkModeToggle} />
//               <span className="slider"></span>
//             </label>

//             <div className="user-profile">
//               <img
//                 src="https://randomuser.me/api/portraits/men/32.jpg"
//                 alt="Admin"
//               />
//               <span>Admin</span>
//             </div>
//           </div>
//         </div>
//    <div class="content">
//         <div class="page-title">
//            <h2>Dashboard Overview</h2> 
//            <button class="btn btn-primary">
//             <i class="fas fa-plus"></i> Manage Listing
//           </button> 
//         </div>

   
//         <div class="quick-actions">
//           <a href="#" class="action-btn">
//             <i class="fas fa-home"></i>
//             <span>Manage House</span>
//           </a>
//           <a href="#" class="action-btn">
//             <i class="fas fa-car"></i>
//             <span>Manage Car</span>
//           </a>
//           <a href="#" class="action-btn">
//             <i class="fas fa-user-plus"></i>
//             <span>Manage User</span>
//           </a>
//           <a href="#" class="action-btn">
//             <i class="fas fa-check-circle"></i>
//             <span>Approve Listings</span>
//           </a>
//           <a href="#" class="action-btn">
//             <i class="fas fa-envelope"></i>
//             <span>Messages</span>
//           </a>
//           <Link to='/adminsettings' class="action-btn">
//             <i class="fas fa-cog"></i>
//             <span>Settings</span>
//           </Link>
//         </div>


//         <div class="stats-cards">
//           <div class="card">
//             <div class="card-header">
//               <span class="card-title">Total Listings</span>
//               <div class="card-icon blue">
//                 <i class="fas fa-list"></i>
//               </div>
//             </div>
//             <div class="card-body">
//               <h3>{totalListing}</h3>
//               <div class="card-footer">
//                 <span class="badge badge-success">+12% from last month</span>
//               </div>
//             </div>
//           </div>
//           <div class="card">
//             <div class="card-header">
//               <span class="card-title">Active Users</span>
//               <div class="card-icon green">
//                 <i class="fas fa-users"></i>
//               </div>
//             </div>
//             <div class="card-body">
//               <h3>{totalUsers}</h3>
//               <div class="card-footer">
//                 <span class="badge badge-success">+8% from last month</span>
//               </div>
//             </div>
//           </div>
//           <div class="card">
//             <div class="card-header">
//               <span class="card-title">Pending Approvals</span>
//               <div class="card-icon orange">
//                 <i class="fas fa-clock"></i>
//               </div>
//             </div>
//             <div class="card-body">
//               <h3>{totalPendings}</h3>
//               <div class="card-footer">
//                 <span class="badge badge-warning">Needs attention</span>
//               </div>
//             </div>
//           </div>
//           <Link to='/showsales' class="card">
//             <div class="card-header">
//               <span class="card-title">Total Sales</span>
//               <div class="card-icon pink">
//                 <i class="fas fa-dollar-sign"></i>
//               </div>
//             </div>
//             <div class="card-body">
//               <h3>{totalTransactions.toFixed(2)} ETB</h3>
//               <div class="card-footer">
//                 <span class="badge badge-success">+15% from last month</span>
//               </div>
//             </div>
//           </Link>
//         </div>


//         <div class="recent-activity">
//           {/* <div>
//             <h3 class="section-title">Recent Transactions</h3>
//             <div class="card">
//               <div class="table-responsive">
//                 <table>
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>User</th>
//                       <th>Item</th>
//                       <th>Amount</th>
//                       <th>Status</th>
//                       <th>Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>#TRX-7845</td>
//                       <td>John Doe</td>
//                       <td>3-Bedroom Apartment</td>
//                       <td>$1,200</td>
//                       <td>
//                         <span class="badge badge-success">Completed</span>
//                       </td>
//                       <td>Today, 10:45 AM</td>
//                     </tr>
//                     <tr>
//                       <td>#TRX-7844</td>
//                       <td>Sarah Smith</td>
//                       <td>Toyota Camry 2020</td>
//                       <td>$24,500</td>
//                       <td>
//                         <span class="badge badge-success">Completed</span>
//                       </td>
//                       <td>Today, 09:30 AM</td>
//                     </tr>
//                     <tr>
//                       <td>#TRX-7843</td>
//                       <td>Mike Johnson</td>
//                       <td>Office Space</td>
//                       <td>$3,500</td>
//                       <td><span class="badge badge-warning">Pending</span></td>
//                       <td>Yesterday, 4:15 PM</td>
//                     </tr>
//                     <tr>
//                       <td>#TRX-7842</td>
//                       <td>Emily Wilson</td>
//                       <td>Land Plot</td>
//                       <td>$45,000</td>
//                       <td><span class="badge badge-danger">Failed</span></td>
//                       <td>Yesterday, 2:00 PM</td>
//                     </tr>
//                     <tr>
//                       <td>#TRX-7841</td>
//                       <td>David Brown</td>
//                       <td>2-Bedroom Condo</td>
//                       <td>$950</td>
//                       <td>
//                         <span class="badge badge-success">Completed</span>
//                       </td>
//                       <td>Yesterday, 11:30 AM</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div> */}
//           <Transactions/>

//           <div>
//             <h3 class="section-title">Pending Approvals</h3>
//             {/* <div class="card">
//               <div class="approval-item">
//                 <img
//                   src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//                   alt="House"
//                   class="approval-img"
//                 />
//                 <div class="approval-info">
//                   <h4>Modern Villa</h4>
//                   <p>Submitted by: Alex Morgan</p>
//                   <span class="badge badge-info">House</span>
//                 </div>
//                 <div class="approval-actions">
//                   <button class="btn btn-success btn-sm">
//                     <i class="fas fa-check"></i>
//                   </button>
//                   <button class="btn btn-danger btn-sm">
//                     <i class="fas fa-times"></i>
//                   </button>
//                 </div>
//               </div>
//               <div class="approval-item">
//                 <img
//                   src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//                   alt="Car"
//                   class="approval-img"
//                 />
//                 <div class="approval-info">
//                   <h4>Tesla Model 3</h4>
//                   <p>Submitted by: James Wilson</p>
//                   <span class="badge badge-warning">Car</span>
//                 </div>
//                 <div class="approval-actions">
//                   <button class="btn btn-success btn-sm">
//                     <i class="fas fa-check"></i>
//                   </button>
//                   <button class="btn btn-danger btn-sm">
//                     <i class="fas fa-times"></i>
//                   </button>
//                 </div>
//               </div>
//               <div class="approval-item">
//                 <img
//                   src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//                   alt="House"
//                   class="approval-img"
//                 />
//                 <div class="approval-info">
//                   <h4>Luxury Apartment</h4>
//                   <p>Submitted by: Sophia Lee</p>
//                   <span class="badge badge-info">House</span>
//                 </div>
//                 <div class="approval-actions">
//                   <button class="btn btn-success btn-sm">
//                     <i class="fas fa-check"></i>
//                   </button>
//                   <button class="btn btn-danger btn-sm">
//                     <i class="fas fa-times"></i>
//                   </button>
//                 </div>
//               </div>
//               <div class="approval-item">
//                 <img
//                   src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
//                   alt="Car"
//                   class="approval-img"
//                 />
//                 <div class="approval-info">
//                   <h4>Audi A4 2021</h4>
//                   <p>Submitted by: Robert Taylor</p>
//                   <span class="badge badge-warning">Car</span>
//                 </div>
//                 <div class="approval-actions">
//                   <button class="btn btn-success btn-sm">
//                     <i class="fas fa-check"></i>
//                   </button>
//                   <button class="btn btn-danger btn-sm">
//                     <i class="fas fa-times"></i>
//                   </button>
//                 </div>
//               </div>
//             </div> */}
//             <ApprovalListings/>
//           </div>
//         </div>
//       </div>      </div>
//     </div>
//   );
// }

// export default MainContent;
// MainContent.js





import React, { useState, useEffect } from 'react';
import ApprovalListings from './ApprovalListings';
import Transactions from './Transactions';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faBell, 
  faHome, 
  faCar, 
  faUserPlus, 
  faCheckCircle, 
  faEnvelope, 
  faCog,
  faPlus,
  faList,
  faUsers,
  faClock,
  faDollarSign
} from '@fortawesome/free-solid-svg-icons';
import './MainContent.css';
import Sidebar from './sidebar';

function MainContent() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [totalPendings, settotalPendings] = useState(0);
  const [totalListing, settotalListing] = useState(0);
  const [totalUsers, settotalUsers] = useState(0);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);        

  useEffect(() => {
    document.body.classList.toggle("admin-dark-mode", isDarkMode);
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const fetchPendingListings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/approval/getPendingListings`);
        const totalPendings = response.data.pendingCars.length + response.data.pendingHouses.length;
        settotalPendings(totalPendings);
      } catch (err) {
        console.log(err);
      }
    };
    
    const fetchListing = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/totallistings`);
        const totalListing = response.data.listings.length;
        settotalListing(totalListing);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/getAllUsers`);
        const totalUsers = response.data.users.length;
        settotalUsers(totalUsers);
      } catch (err) {
        console.log(err);
      }
    };
    
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/payment/AllTransactions`);
        const totalAmount = response.data.transactions.reduce(
          (sum, transaction) => sum + Number(transaction.amount),
          0
        );
        setTotalTransactions(totalAmount);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
    fetchUser();
    fetchListing();
    fetchPendingListings();
  }, []);

  return (
    <div className='admin-content'>
    {/* <div className="admin-main-container"> */}
      {/* <Sidebar/> */}
      <div className="admin-main-content">
        {/* <div className="admin-top-nav">
          <div className="admin-search-bar">
            <FontAwesomeIcon icon={faSearch} className="admin-search-icon" />
            <input type="text" placeholder="Search..." className="admin-search-input" />
          </div>

          <h1 className="admin-welcome-title">Welcome To Admin Dashboard</h1>

          <div className="admin-user-actions">
            <div className="admin-notification-bell">
              <FontAwesomeIcon icon={faBell} className="admin-notification-icon" />
              <span className="admin-notification-badge">5</span>
            </div>

            <label className="admin-dark-mode-toggle">
              <input 
                type="checkbox" 
                checked={isDarkMode} 
                onChange={handleDarkModeToggle} 
                className="admin-dark-mode-input"
              />
              <span className="admin-dark-mode-slider"></span>
            </label>

            <div className="admin-user-profile">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Admin"
                className="admin-profile-image"
              />
              <span className="admin-profile-name">Admin</span>
            </div>
          </div>
        </div> */}
        
        <div className="admin-content">
          <div className="admin-page-title">
            <h4>Dashboard Overview</h4> 
            {/* <button className="admin-primary-btn">
              <FontAwesomeIcon icon={faPlus} className="admin-btn-icon" />
              <span>Manage Listing</span>
            </button>  */}
          </div>

          <div className="admin-quick-actions">
            <Link to="/admin/managehouses" className="admin-action-btn">
              <FontAwesomeIcon icon={faHome} className="admin-action-icon" />
              <span className="admin-action-text">Manage House</span>
            </Link>
            <Link to="/admin/Managecars" className="admin-action-btn">
              <FontAwesomeIcon icon={faCar} className="admin-action-icon" />
              <span className="admin-action-text">Manage Car</span>
            </Link>
            <Link to="/admin/ManageUsers" className="admin-action-btn">
              <FontAwesomeIcon icon={faUserPlus} className="admin-action-icon" />
              <span className="admin-action-text">Manage User</span>
            </Link>
            <Link to="/admin/PendingApprovals" className="admin-action-btn">
              <FontAwesomeIcon icon={faCheckCircle} className="admin-action-icon" />
              <span className="admin-action-text">Approve Listings</span>
            </Link>
            <Link to="/admin/Feedbacks" className="admin-action-btn">
              <FontAwesomeIcon icon={faEnvelope} className="admin-action-icon" />
              <span className="admin-action-text">Messages</span>
            </Link>
            <Link to='/admin/settings' className="admin-action-btn">
              <FontAwesomeIcon icon={faCog} className="admin-action-icon" />
              <span className="admin-action-text">Settings</span>
            </Link>
          </div>

          <div className="admin-stats-cards">
            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-title">Total Listings</span>
                <div className="admin-card-icon admin-icon-blue">
                  <FontAwesomeIcon icon={faList} className="admin-card-icon-img" />
                </div>
              </div>
              <div className="admin-card-body">
                <h3 className="admin-card-value">{totalListing}</h3>
                <div className="admin-card-footer">
                  <span className="admin-badge admin-badge-success">+12% from last month</span>
                </div>
              </div>
            </div>
            
            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-title">Active Users</span>
                <div className="admin-card-icon admin-icon-green">
                  <FontAwesomeIcon icon={faUsers} className="admin-card-icon-img" />
                </div>
              </div>
              <div className="admin-card-body">
                <h3 className="admin-card-value">{totalUsers}</h3>
                <div className="admin-card-footer">
                  <span className="admin-badge admin-badge-success">+8% from last month</span>
                </div>
              </div>
            </div>
            
            <div className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-title">Pending Approvals</span>
                <div className="admin-card-icon admin-icon-orange">
                  <FontAwesomeIcon icon={faClock} className="admin-card-icon-img" />
                </div>
              </div>
              <div className="admin-card-body">
                <h3 className="admin-card-value">{totalPendings}</h3>
                <div className="admin-card-footer">
                  <span className="admin-badge admin-badge-warning">Needs attention</span>
                </div>
              </div>
            </div>
            
            <Link to='/admin/sales' className="admin-card">
              <div className="admin-card-header">
                <span className="admin-card-title">Total Sales</span>
                <div className="admin-card-icon admin-icon-pink">
                  <FontAwesomeIcon icon={faDollarSign} className="admin-card-icon-img" />
                </div>
              </div>
              <div className="admin-card-body">
                <h3 className="admin-card-value">{totalTransactions.toFixed(2)} ETB</h3>
                <div className="admin-card-footer">
                  <span className="admin-badge admin-badge-success">+15% from last month</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="admin-recent-activity">
            <Transactions/>
                    <div className="approval-list-container">            <ApprovalListings/>

</div>
          </div>
        {/* </div> */}
      </div>
    </div></div>


    
  );
}

export default MainContent;