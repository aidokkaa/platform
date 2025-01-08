import React from 'react'
import '../scss/styles/header.scss'
import { Link } from 'react-router-dom'
const Header = () => {

  return (
    <div>
       <header className="header">
      <div className="container">
     {/* Logo */}
        <div className="logo">
          <a href="/">
            <img src="logo.png" alt="Business Platform Logo" />
          </a>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="#home">Home</a></li>

            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="auth-buttons">
          <Link to='/login' className='btn btn-login'>Login</Link>
          <a href="/register" className="btn btn-register">Sign Up</a>
        </div>
      </div>
    </header>
    </div>
  )
}

export default Header
