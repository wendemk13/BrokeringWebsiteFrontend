import React from 'react'
import ProfileSettings from './ProfileSettings.jsx';
import { Link } from 'react-router-dom';

function AdminSettings() {
  return (
    <div>
      <Link to='/profilesetting'>
     <h2>Profile Setting</h2>
      </Link>
      <Link to='/changepassword'>
     <h2>change password Setting</h2>
      </Link>
      <Link to='/notificationsetting'>
     <h2>Notification Setting</h2>
      </Link>
    </div>
  )
}

export default AdminSettings
