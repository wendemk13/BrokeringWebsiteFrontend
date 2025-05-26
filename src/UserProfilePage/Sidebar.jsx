import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

const Sidebar = () => {
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
        <div className="sidebar" id="sidebar">
            <div className="logo">
                <span className="logo-icon">🏠</span>
                <span>BrokerPro</span>
            </div>
            
            <Link href="#" className="nav-item active">
                <i>📊</i>
                <span>Dashboard</span>
            </Link>
            <Link href="#" className="nav-item">
                <i>🚗</i>
                <span>Listings</span>
            </Link>
            <Link href="#" className="nav-item">
                <i>💬</i>
                <span>Messages</span>
            </Link>
            <Link to={`/UserTransactions/${user_id}`} className="nav-item">
                <i>💬</i>
                <span>User Transactions</span>
            </Link>
            <Link href="#" className="nav-item">
                <i>📈</i>
                <span>Analytics</span>
            </Link>
            <Link href="#" className="nav-item">
                <i>⚙️</i>
                <span>Settings</span>
            </Link>
        </div>
    );
};

export default Sidebar;