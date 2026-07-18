import React from 'react';
import nutritionImg from '../assets/Nutrition2.jpeg';

const About = () => {
  return (
    <div className="about">
      <section className="section container">
        <h1 className="section-title">Why HealthTrack</h1>
        <p className="section-subtitle">Everything you need to build healthier habits, in one place.</p>
        
        <div className="about-grid">
          <div className="about-text">
            <div className="about-feature">
              <span className="about-icon">🏃</span>
              <h3>Daily Activity</h3>
              <p>Log your steps, workouts, and active minutes automatically.</p>
            </div>
            <div className="about-feature">
              <span className="about-icon">🍎</span>
              <h3>Nutrition</h3>
              <p>Keep track of meals and calories to stay on top of your goals.</p>
            </div>
            <div className="about-feature">
              <span className="about-icon">😴</span>
              <h3>Sleep & Recovery</h3>
              <p>Understand your sleep patterns and recover the smart way.</p>
            </div>
          </div>
          
          <div className="about-image">
            <img src={nutritionImg} alt="Healthy lifestyle" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;