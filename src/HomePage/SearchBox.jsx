import React from 'react'

function SearchBox() {
  return (
    <div>
          <div className="search-box">
      <div className="search-tabs">
        <div className="search-tab active">Buy</div>
        <div className="search-tab">Rent</div>
        <div className="search-tab">Sell</div>
      </div>

      <form className="search-form">
        <div className="form-group">
          <label for="location">Location</label>
          <select id="location" className="form-control">
            <option value="">Anywhere</option>
            <option value="addis">Addis Ababa</option>
            <option value="dire">Dire Dawa</option>
            <option value="bahir">Bahir Dar</option>
            <option value="mekele">Mekele</option>
          </select>
        </div>

        <div className="form-group">
          <label for="type">Type</label>
          <select id="type" className="form-control">
            <option value="">Any Type</option>
            <option value="house">House</option>
            <option value="apartment">Apartment</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>

        <div className="form-group">
          <label for="bedrooms">Bedrooms</label>
          <select id="bedrooms" className="form-control">
            <option value="">Any</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>

        <div className="form-group">
          <label for="price">Price Range</label>
          <select id="price" className="form-control">
            <option value="">Any Price</option>
            <option value="0-500">$0 - $500</option>
            <option value="500-1000">$500 - $1,000</option>
            <option value="1000-2000">$1,000 - $2,000</option>
            <option value="2000+">$2,000+</option>
          </select>
        </div>

        <button type="submit" className="search-btn">Search Properties</button>
      </form>
    </div>
    </div>
  )
}

export default SearchBox
