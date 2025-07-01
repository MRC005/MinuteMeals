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
    <h2>Our Offices</h2>
    <ul>
        <li>
            <strong>Head Office:</strong>
            <br />
            <br />
            G.S Road, Bhangagarh, Guwahati, Assam
        </li>
        <br />
        <li>
            <strong>Branches:</strong>
            <br />
            <br />
            <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
                <li>MG Road, Bengaluru</li>
                <li>Salt Lake, Kolkata</li>
                <li>Connaught Place, New Delhi</li>
                <li>Powai, Mumbai</li>
                <li>Anna Nagar, Chennai</li>
                
                <li>Banjara Hills, Hyderabad</li>
               
               
                <li>Lalbagh, Lucknow</li>
              
            </ul>
        </li>
        <li>
            <em>We’re expanding to more cities soon!</em>
        </li>
    </ul>
</div>

        <div className="footer-content-right">
          <h2>Get in touch</h2>
          <ul>
            <li>
              <a href="tel:+918473123434" className="footer-contact-link">+91 8473123434</a>
            </li>
            <li>
              <a href="mailto:machumroy.choudhury@vitstudent.ac.in" className="footer-contact-link">machumroy.choudhury@vitstudent.ac.in</a>
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
