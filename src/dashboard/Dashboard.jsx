// import React from 'react'
// import MainContent from './MainContent'
// import Sidebar from './sidebar'
// import "./dashboard.css"
// function Dashboard() {
//   return (
//     <>
//      {/* <div className='dashcont'> */}
//         <Sidebar/>
//       <MainContent/>
//      {/* </div> */}
//     </>
//   )
// }

// export default Dashboard


// Dashboard.js
import React, { useEffect, useState } from 'react';
import MainContent from './MainContent.jsx';
import Sidebar from './sidebar.jsx';
import './dashboard.css';

function Dashboard() {
      const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
     <div className={`app ${isSidebarOpen ? 'sidebar-open' : ''}  admin-dashcont`}>
        <Sidebar />
       <MainContent />
      
    </div>
    </>
   
  );
}

export default Dashboard;