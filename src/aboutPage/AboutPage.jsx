// import React from 'react';
// import { FaHome, FaHandshake, FaUsers, FaChartLine, FaAward } from 'react-icons/fa';
// import team1 from '../Assets/team1.png'
// import team2 from '../Assets/team2.png';
// import team3 from '../Assets/team3.png';
// import './AboutPage.css';

// const AboutPage = () => {
//   return (
//     <div className="about-page">
//       {/* Hero Section */}
//       <div className="about-hero">
//         <div className="hero-content">
//           <h1>Our Story</h1>
//           <p>Transforming real estate in Ethiopia through innovation and trust</p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="about-container">
//         {/* Our Story Section */}
//         <section className="about-section">
//           <div className="section-content">
//             <h2>From Humble Beginnings</h2>
//             <p>
//               Founded in 2020, BetGebeya started as a small team of real estate enthusiasts
//               frustrated with the lack of transparency in Ethiopia's property market. Today,
//               we're the nation's fastest-growing real estate platform, connecting thousands
//               of buyers and sellers every month.
//             </p>
//             <div className="stats-grid">
//               <div className="stat-card">
//                 <FaHome className="stat-icon" />
//                 <h3>10,000+</h3>
//                 <p>Properties Listed</p>
//               </div>
//               <div className="stat-card">
//                 <FaUsers className="stat-icon" />
//                 <h3>200+</h3>
//                 <p>Trusted Agents</p>
//               </div>
//               <div className="stat-card">
//                 <FaHandshake className="stat-icon" />
//                 <h3>5,000+</h3>
//                 <p>Successful Transactions</p>
//               </div>
//             </div>
//           </div>
//           <div className="section-image">
//             <img
//               src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
//               alt="Our office"
//             />
//           </div>
//         </section>

//         {/* Mission Section */}
//         <section className="mission-section">
//           <div className="mission-content">
//             <h2>Our Mission</h2>
//             <p>
//               To democratize access to quality housing by creating Africa's most transparent
//               and efficient real estate marketplace. We believe everyone deserves a home
//               that matches their dreams and budget.
//             </p>
//             <div className="values-grid">
//               <div className="value-card">
//                 <div className="value-icon">
//                   <FaHandshake />
//                 </div>
//                 <h3>Integrity</h3>
//                 <p>Every listing is verified by our team</p>
//               </div>
//               <div className="value-card">
//                 <div className="value-icon">
//                   <FaChartLine />
//                 </div>
//                 <h3>Innovation</h3>
//                 <p>Technology-driven solutions</p>
//               </div>
//               <div className="value-card">
//                 <div className="value-icon">
//                   <FaAward />
//                 </div>
//                 <h3>Excellence</h3>
//                 <p>Quality service at every step</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Team Section */}
//         <section className="team-section">
//           <h2>Meet Our Leadership</h2>
//           <div className="team-grid">
//             <div className="team-card">
//               <img src={team1} alt="CEO" />
//               <h3>Selamawit Bekele</h3>
//               <p>Founder & CEO</p>
//               <p className="bio">15+ years in real estate development</p>
//             </div>
//             <div className="team-card">
//               <img src={team2} alt="CTO" />
//               <h3>Yonas Assefa</h3>
//               <p>Chief Technology Officer</p>
//               <p className="bio">Tech innovator with fintech background</p>
//             </div>
//             <div className="team-card">
//               <img src={team3} alt="Head of Sales" />
//               <h3>Mekdes Girma</h3>
//               <p>Head of Sales</p>
//               <p className="bio">Former top-performing real estate agent</p>
//             </div>
//           </div>
//         </section>

//         {/* CTA Section */}
//         <section className="about-cta">
//           <h2>Ready to find your perfect property?</h2>
//           <button className="cta-button">Browse Listings</button>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AboutPage;

import React from "react";
import Footer from "../HomePage/Footer";

function AboutPage() {
  return (
    <div>
      <Footer />
    </div>
  );
}

export default AboutPage;
