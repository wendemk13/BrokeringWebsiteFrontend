// import React from 'react'
// import { Link } from 'react-router-dom'

// function HeroSection() {
//   return (
//     <div>
//        <section className="hero">
//       <div className="hero-content">
//         <h2>Find Your Dream Home or Vehicle</h2>
//         <p>
//           Discover the perfect property or car from our extensive listings
//           across the country. Buy, sell, or rent with ease.
//         </p>
//         <Link to='/SearchPage' className="btn btn-white">Explore Listings</Link>
//       </div>
//     </section>
//     </div>
//   )
// }

// export default HeroSection



import React from 'react';
import { Link } from 'react-router-dom';
import './HeroSection.css';
import { useTranslation } from 'react-i18next';

function HeroSection() {
  const {t,i18n}=useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  return (
    <section className="listof-hero">
      <div className="listof-hero-content">
        <h1 className="listof-hero-title">{t(`Find Your Dream Home or Vehicle`)}</h1>
        <p className="listof-hero-subtitle">
  {t('Discover the perfect property or car from our extensive listings across the country. Buy, sell, or rent with ease.')}
</p>

        <div className="listof-hero-buttons" style={{marginTop:"10px"}}>
          {/* <Link to='/houses' className="listof-btn listof-btn-primary">
            Browse Properties
          </Link>
          <Link to='/cars' className="listof-btn listof-btn-outline">
            View Vehicles
          </Link> */}
             <Link to='/SearchPage' className="btn btn-white">{t("Search For Houses & Cars")}</Link>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;