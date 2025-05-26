import React from 'react';

function SimilarProperties() {
  return (
    <div>
      <div className="similar-listings">
        <h2 className="section-title">Similar Listings</h2>
        <div className="listing-grid">
          {/* Similar Listing 1 */}
          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1616461921787-6e08f6ed3ea4?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg5OHwwfDF8c2VhY2h8MXx8cGxhdGZvc3xlbnwwfDF8fHx8&ixlib=rb-1.2.1&q=80&w=1080" 
              alt="Luxury Condo" 
              className="listing-img"
            />
            <div className="listing-content">
              <div className="listing-price">$275,000</div>
              <div className="listing-address">Piazza Bologna, Rome, Italy</div>
              <div className="listing-features">
                <span>3 Beds</span>
                <span>2 Baths</span>
                <span>1,600 sqft</span>
              </div>
            </div>
          </div>

          {/* Similar Listing 2 */}
          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1571188734437-b410ee8e572e?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg5OHwwfDF8c2VhY2h8Mnx8cGxhdGZvc3xlbnwwfDF8fHx8&ixlib=rb-1.2.1&q=80&w=1080" 
              alt="Urban Loft" 
              className="listing-img"
            />
            <div className="listing-content">
              <div className="listing-price">$450,000</div>
              <div className="listing-address">Downtown, Los Angeles, USA</div>
              <div className="listing-features">
                <span>2 Beds</span>
                <span>2 Baths</span>
                <span>1,200 sqft</span>
              </div>
            </div>
          </div>

          {/* Similar Listing 3 */}
          <div className="listing-card">
            <img 
              src="https://images.unsplash.com/photo-1571633202957-e4ccf2eaf7f5?crop=entropy&cs=tinysrgb&fit=max&ixid=MXwyMDg5OHwwfDF8c2VhY2h8M3x8cGxhdGZvc3xlbnwwfDF8fHx8&ixlib=rb-1.2.1&q=80&w=1080" 
              alt="Country Villa" 
              className="listing-img"
            />
            <div className="listing-content">
              <div className="listing-price">$600,000</div>
              <div className="listing-address">Countryside, Tuscany, Italy</div>
              <div className="listing-features">
                <span>4 Beds</span>
                <span>3 Baths</span>
                <span>3,000 sqft</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimilarProperties;
