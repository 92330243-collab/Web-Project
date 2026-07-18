import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div>
          <h3>HealthTrack</h3>
          <p>Track your steps, meals, and workouts in one simple dashboard.</p>
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>hello@healthtrack.app</li>
            <li>+961 81 340 560</li>
          </ul>
        </div>
      </div>

      <p className="footer-bottom">© {year} HealthTrack. All rights reserved.</p>
    </footer>
  )
}
