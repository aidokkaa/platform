import React from 'react'
import Hero from './Hero'
import Header from './Header';
import FeaturesSection from './FeaturesSection';
import ThirdBlock from './ThirdBlock';
import SecondBlock from './SecondBlock';
import Slides from './Slides';
import HowItWorks from './HowItworks';
import RotatingIcons from './RotatingIcons';
import '../scss/style.scss'
const LandingPage = () => {
  return (
    <div>
      <Header></Header>
      <Hero></Hero>
      <FeaturesSection></FeaturesSection>
      <HowItWorks></HowItWorks>
      <SecondBlock></SecondBlock>
      <RotatingIcons></RotatingIcons>
      <ThirdBlock></ThirdBlock>
      
    </div>
  )
}

export default LandingPage
