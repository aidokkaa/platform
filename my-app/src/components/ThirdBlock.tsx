import React from 'react';
import '../scss/styles/action.scss'


const ThirdBlock = () => {
  return (
    <section className="innovation">
      <div className="container">
        <h2 className="innovation__title">Innovations That Inspire</h2>
        <p className="innovation__subtitle">
          Discover the tools that empower you to achieve more and reach new heights.
        </p>
        <div className="innovation__graphics">
          <div className="graphic graphic--1"></div>
          <div className="graphic graphic--2"></div>
          <div className="graphic graphic--3"></div>
        </div>
        <a href="/learn-more" className="btn">Learn More</a>
      </div>
    </section>
  );
};

export default ThirdBlock;
