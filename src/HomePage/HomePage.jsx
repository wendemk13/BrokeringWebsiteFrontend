import React from 'react'
import './HomePage.css'
// import Header from './Header'
import HeroSection from './HeroSection'
import FeaturedCars from './FeaturedCars'
import Testimonials from './Testimonials'
import FeaturedHouses from './FeaturedHouses'
import Works from './Works'
// import Footer from './Footer'
function HomePage() {
  return (
    <div>
      {/* <Header/> */}
      <HeroSection/>
      <FeaturedHouses/>
      <FeaturedCars/>
      <Testimonials/>
      <Works/>
      {/* <Footer/> */}
    </div>
  )
}

export default HomePage
