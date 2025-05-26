import React from 'react'
import { Link } from 'react-router-dom'

function GetStarted() {
  return (
    <div>
       <section className="cta">
      <h2>Ready to Find Your Dream Property or Vehicle?</h2>
      <p>
        Join thousands of satisfied customers who found their perfect match
        through our platform
      </p>
      <Link href="#" className="btn btn-primary">Get Started</Link>
    </section>

    </div>
  )
}

export default GetStarted
