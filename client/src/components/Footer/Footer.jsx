import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo_bottom} alt="MinuteMeals Logo" />
          <p>
            MinuteMeals is your go-to platform for discovering and ordering delicious food, inspired by the best of modern food delivery apps. Designed for hands-on learning and real-world UI experience.
          </p>
          <div className="footer-social-icons">
            <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="Facebook" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="Twitter" />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={assets.linkedin_icon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li><a href="https://faceprep.edmingle.com/" target="_blank" rel="noopener noreferrer">Home</a></li>
            <li><a href="https://faceprep.edmingle.com/contact-us" target="_blank" rel="noopener noreferrer">About us</a></li>
            <li><a href="https://faceprep.edmingle.com/courses" target="_blank" rel="noopener noreferrer">Courses</a></li>
            <li><a href="https://faceprep.edmingle.com/reviews" target="_blank" rel="noopener noreferrer">Reviews</a></li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>
              <a href="tel:+919629745022" className="footer-contact-link">+91 96297 45022</a>
            </li>
            <li>
              <a href="mailto:enquiry@faceprep.in" className="footer-contact-link">enquiry@faceprep.in</a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        &copy; {new Date().getFullYear()} MinuteMeals. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
