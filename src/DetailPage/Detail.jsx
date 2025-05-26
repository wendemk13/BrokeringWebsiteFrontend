import React from 'react'
import PropertyGallery from './PropertyGallery'
import SimilarProperties from './SimilarProperties'

function Detail() {
  return (
    <div>
          <div class="property-detail-container">
            <PropertyGallery/>
            <SimilarProperties/>
</div>
      
    </div>
  )
}

export default Detail
