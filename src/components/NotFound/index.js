import Header from '../Header'
import './index.css'
import React from 'react'

const NotFound = () => (
  <div>
    <Header />
    <div className="not-found">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <p>Page Not Found</p>
    </div>
  </div>
)

export default NotFound
