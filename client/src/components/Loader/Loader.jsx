import React from 'react'
import './Loader.css'

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="loader" role="status" aria-live="polite">
      <div className="spinner"></div>
      <span className="loader-text">{text}</span>
    </div>
  )
}

export default Loader
