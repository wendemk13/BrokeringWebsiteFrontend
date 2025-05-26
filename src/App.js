import './i18n'; // 👈 import the config

// import './App.css';
// import HomePage from './HomePage/HomePage';
// import Footer from './components/Footer.jsx';
// import Header from './components/Header.jsx';
// // import Dashboard from './dashboard/Dashboard';
// import PropertyDetailPage from './detail/PropertyDetailPage.jsx';
// // import "../src/HomePage/HomePage.css"
// import Login from './Login/Login.jsx';
// import Register from './Register/Register.jsx'
// import { Route, Router, Routes } from 'react-router-dom';
// import ListOfProperties from './Properties/ListOfProperties.jsx';
// import ListOfCars from './Cars/ListOfCars.jsx';
// import AboutPage from './aboutPage/AboutPage.jsx';
// import ContactPage from './contactPage/ContactPage.jsx';
// import ChatbotPage from './ChatBot/ChatbotPage.jsx';
// import CarDetailPage from './CarDetailPage/CarDetailPage.jsx';
// import UserProfilePage from './UserProfilePage/UserProfilePage.jsx';
// import EditHousePage from './UserProfilePage/EditHousePage.jsx';
// import EditCarPage from './UserProfilePage/EditCarPage.jsx'
// // import CusDashBoard from './CusDashBoard/CusDashBoard.jsx';

// function App() {
//   return (
//     <div>  
//         <Header />
//       <Routes>

//         <Route path='/' element={<HomePage />} />
//         <Route path='/PropertyDetail/:id' element={<PropertyDetailPage />} />
//         <Route path='/CarDetail/:id' element={<CarDetailPage />} />
//         <Route path='/login' element={<Login />} />
//         <Route path='/register' element={<Register />} />
//         <Route path='/properties' element={<ListOfProperties />} />
//         <Route path='/cars' element={<ListOfCars />} />
//         <Route path='/about' element={<AboutPage />} />
//         <Route path='/contact' element={<ContactPage />} />
//         <Route path='/chatbot' element={<ChatbotPage />} />
//         {/* <Route path='/profile' element={<CusDashBoard/>}/>  */}
//         <Route path="/edit-house/:id" component={<EditHousePage/>} />
//         <Route path="/edit-car/:carid" component={<EditCarPage/>} />

//       {/* <Route path='/admindashboard' element={<Dashboard/>}/> */}
//       {/* user profile */}
//         <Route path='/userprofilepage' element={<UserProfilePage/>}/>
//       </Routes>

//        <Footer />


//     </div>
//   );
// }

// export default App;



import './App.css';
import HomePage from './HomePage/HomePage';
// import Footer from './components/Footer.jsx';
import Header from './components/Header.jsx';
import PropertyDetailPage from './detail/PropertyDetailPage.jsx';
import Login from './Login/Login.jsx';
import Register from './Register/Register.jsx';
import { Route, Routes } from 'react-router-dom';
import ListOfProperties from './Properties/ListOfProperties.jsx';
import ListOfCars from './Cars/ListOfCars.jsx';
import AboutPage from './aboutPage/AboutPage.jsx';
import ContactPage from './contactPage/ContactPage.jsx';
import ChatbotPage from './ChatBot/ChatbotPage.jsx';
import CarDetailPage from './CarDetailPage/CarDetailPage.jsx';
import UserProfilePage from './UserProfilePage/UserProfilePage.jsx';
import EditHousePage from './UserProfilePage/EditHousePage.jsx';
import EditCarPage from './UserProfilePage/EditCarPage.jsx';
import AddProperty from './UserProfilePage/AddProperty.jsx';
import AddCarPage from './UserProfilePage/AddCarPage.jsx';
import ChapaPaymentForm from './chapa/ChapaPaymentForm.jsx';
import PaymentFailedPage from './chapa/PaymentFailedPage.jsx'
import PaymentSuccessPage from './chapa/PaymentSuccessPage.jsx';
import Dashboard from './dashboard/Dashboard';
import ProfileSettings from './dashboard/settings/ProfileSettings.jsx';
import AdminSettings from './dashboard/settings/AdminSettings.jsx';
import Sales from './dashboard/sales/Sales.jsx';
import NotificationSettings from './dashboard/settings/NotificationSettings.jsx';
// import UserTransactions from './UserProfilePage/UserProfilePage.jsx';
import UserSetting from './UserProfilePage/UserSetting.jsx';
import UserPaymentHistory from './UserProfilePage/UserPaymentHistory.jsx';
import UserProfileUpdate from './UserProfilePage/settings/UserProfileUpdate.jsx';
import ChangePassword from './UserProfilePage/settings/ChangePassword.jsx';
import Houses from './UserProfilePage/Houses.jsx';
import Cars from './UserProfilePage/Cars.jsx';
import HouseDetailPage from './UserProfilePage/HouseDetailPage.jsx';
import CarDetail from './UserProfilePage/CarDetail.jsx';
import PendingApprovals from './dashboard/pendingapprovals/PendingApprovals.jsx';
import PendingHouseDetail from './dashboard/pendingapprovals/PendingHouseDetail.jsx';
import PendingCarDetail from './dashboard/pendingapprovals/PendingCarDetail.jsx';
import Feedbacks from './dashboard/feedback/Feedbacks.jsx';
import ManageUsers from './dashboard/manageusers/ManageUsers.jsx';
import ManageHouses from './dashboard/managehouses/ManageHouses.jsx';
import ManageCars from './dashboard/managecars/ManageCars.jsx';
import UserList from './dashboard/manageusers/UserList.jsx';
import UserProfile from './dashboard/manageusers/UserProfile.jsx';
import UserForm from './dashboard/manageusers/UserForm.jsx';
import BanUser from './dashboard/manageusers/BanUser.jsx';
import Messages from './UserProfilePage/messages/Messages.jsx';
import UserFeedbacks from './UserProfilePage/messages/UserFeedbacks.jsx';
import InboxMessages from './UserProfilePage/messages/InboxMessages.jsx';
import MessageDetail from './UserProfilePage/messages/MessageDetail.jsx';
import SendReply from './dashboard/feedback/SendReply.jsx';
import ContactOwner from './contactowner/ContactOwner.jsx';
import ChatPage from './UserProfilePage/messages/ChatPage.jsx';
import DownloadReceit from './chapa/DownloadReceit.jsx';
import CheckPaymentPage from './chapa/CheckPaymentPage.jsx'
import SearchPage from './searchcomponent/SearchPage.jsx';
import TermsPage from './terms/TermsPage.jsx'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/PropertyDetail/:id' element={<PropertyDetailPage />} />
        <Route path='/CarDetail/:id' element={<CarDetailPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/properties' element={<ListOfProperties />} />
        <Route path='/cars' element={<ListOfCars />} />
        <Route path='/about' element={<AboutPage />} />
        <Route path='/contact' element={<ContactPage />} />
        <Route path='/chatbot' element={<ChatbotPage />} />
        <Route path="/edit-house/:id" element={<EditHousePage />} />
        <Route path="/edit-car/:id" element={<EditCarPage />} />
        <Route path='/userprofilepage' element={<UserProfilePage />} />
        <Route path='/addproperty' element={<AddProperty />} />
        <Route path='/addcar' element={<AddCarPage />} />
        <Route path='/ChapaPaymentForm' element={<ChapaPaymentForm />} />

        {/* <Route path='/paysuccess/:txRef' element={<PaymentSuccessPage />} /> */}
        <Route path='/paysuccess/:listingtype/:propertyType/:propertyId/:txRef' element={<PaymentSuccessPage />} />

        <Route path='/payfailed' element={<PaymentFailedPage />} />
        <Route path='/admindashboard' element={<Dashboard />} />
        <Route path='/adminsettings' element={<AdminSettings />} />

        <Route path='/showsales' element={<Sales />} />
        <Route path='/profilesetting' element={<ProfileSettings />} />
        <Route path='/notificationsetting' element={<NotificationSettings />} />
        <Route path='/UserPaymentHistory/:user_id' element={<UserPaymentHistory />} />
        <Route path='/UserSetting' element={<UserSetting />} />
        <Route path='/user/House' element={<Houses />} />
        <Route path='/user/car' element={<Cars />} />
        <Route path='/user/UserProfileUpdate' element={<UserProfileUpdate />} />
        <Route path='/ChangePassword' element={<ChangePassword />} />

        {/* feedbacks for user */}
        <Route path='/user/InboxMessages' element={<InboxMessages />} />
        <Route path='/user/usermessages' element={<Messages />} />
        <Route path='/user/userfeedbacks/:user_id' element={<UserFeedbacks />} />
        <Route path="/message-detail/:id" element={<MessageDetail />} />


        <Route path="/houses/:id" element={<HouseDetailPage />} />
        <Route path="/cars/:id" element={<CarDetail />} />
        <Route path='/admin/PendingApprovals' element={<PendingApprovals />} />
        <Route path='/PendingHouseDetail' element={<PendingHouseDetail />} />
        <Route path='/PendingCarDetail' element={<PendingCarDetail />} />

        <Route path='/admin/settings' element={<AdminSettings />} />


        {/* Feedbacks */}
        <Route path='/admin/Feedbacks' element={<Feedbacks />} />
        <Route path='/admin/sendreply/:feedbackid' element={<SendReply />} />

        {/* ManageUsers. */}
        <Route path='/admin/ManageUsers' element={<ManageUsers />} />

        {/* ManageHouses */}
        <Route path='/admin/managehouses' element={<ManageHouses />} />

        {/* Managecars */}
        <Route path='/admin/Managecars' element={<ManageCars />} />



        {/* manage users */}
        <Route path="/admin/users" element={<UserList />} />
        <Route path="/admin/users/:userId" element={<UserProfile />} />
        <Route path="/admin/users/edit/:userId" element={<UserForm />} />
        <Route path="/admin/users/add" element={<UserForm />} />
        <Route path="/admin/users/ban/:userId" element={<BanUser />} />

        {/* ContactOwner */}
        <Route path='/ContactOwner' element={<ContactOwner />} />
        <Route path="/chat/:senderId" element={<ChatPage />} />

        {/* DownloadReceit */}
        <Route path='/DownloadReceit/:txRef' element={<DownloadReceit />} />
        <Route path='/CheckPaymentPage/:txRef' element={<CheckPaymentPage />} />


        {/* SearchPage */}
        <Route path='/SearchPage' element={<SearchPage />} />
        {/* TermsPage */}
        <Route path='/terms' element={<TermsPage />} />
      </Routes>


      {/* <Footer /> */}
    </div>
  );
}

export default App;

