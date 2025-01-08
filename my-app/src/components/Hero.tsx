import React from 'react'
import { useEffect } from 'react';
import '../scss/styles/_hero.scss'
const Hero = () => {   
      return (
      <>
     <div className="hero">
      <div className="web"></div>
      <div className="hero-content">
        <h1>Your Work. Your Goals. Our Solutions.</h1>
        <p>Streamline your workflow, collaborate more efficiently, and achieve better results.</p>
        <a href="#get-started" className="btn">
          Get Started
        </a>
      </div>
    </div>
      </>
      );
}

export default Hero
