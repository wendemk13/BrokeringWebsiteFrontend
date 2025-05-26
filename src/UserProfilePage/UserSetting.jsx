// import React from 'react'
// import './UserSetting.css'
// import { Link } from 'react-router-dom'
// import { useTranslation } from 'react-i18next';
// function UserSetting() {
  
//     const { t, i18n } = useTranslation();
  
//     const changeLanguage = (lng) => {
//       i18n.changeLanguage(lng);
//     };
  
//   return (
//     <div className='setting-container'>
//       <Link to='/user/UserProfileUpdate'>
//       Update Profile
//       </Link>
//        <Link to='/ChangePassword'>
//       Change Password
//       </Link>
//       <Link>
//             <button onClick={() => changeLanguage('en')}>English</button>
//             <button onClick={() => changeLanguage('am')}>Amharic</button>
//           </Link>
          
     
//     </div>
//   )
// }

// export default UserSetting


import React, { useEffect, useState } from 'react';
import './UserSetting.css';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function UserSetting() {
  const { t, i18n } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(localStorage.getItem('preferredLang') || 'en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('preferredLang', lng);
    setSelectedLang(lng);
  };

  useEffect(() => {
    const preferredLang = localStorage.getItem('preferredLang');
    if (preferredLang) {
      i18n.changeLanguage(preferredLang);
    }
  }, [i18n]);

  return (
    <div className='setting-container'>
      <Link to='/user/UserProfileUpdate'>{t(`Update Profile`)}</Link>
      <Link to='/ChangePassword'>{t(`Change Password`)}</Link>

      <div className="language-select">
        <label htmlFor="language">{t`Language`}:</label>
        <select
          id="language"
          value={selectedLang}
          onChange={(e) => changeLanguage(e.target.value)}
        >
          <option value="en">{t(`English`)}</option>
          <option value="am">{t(`Amharic`)}</option>
        </select>
      </div>
    </div>
  );
}

export default UserSetting;
