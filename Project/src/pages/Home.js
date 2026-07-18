import React from 'react';
import { Link } from 'react-router-dom';
import fitnessImg from '../assets/fitness3.jpeg';
import heroImg from '../assets/hero.jpeg';
import nutritionImg from '../assets/Nutrition2.jpeg';

const Home = () => {
  const features = [
    {
      title: "Fitness Training",
      description: "Get in shape with our expert-led fitness programs",
      image: fitnessImg
    },
    {
      title: "Workout Sessions",
      description: "Join guided workout sessions for all levels",
      image: heroImg
    },
    {
      title: "Nutrition & Diet",
      description: "Track your meals and stay on top of your goals",
      image: nutritionImg
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>Take control of your health, one day at a time</h1>
            <p>
              HealthTrack helps you monitor your activity, nutrition, and sleep - 
              all from a single, simple dashboard.
            </p>
            <Link to="/dashboard" className="btn-primary">Go to Dashboard</Link>
          </div>
          <div className="hero-image">
            <img src={heroImg} alt="Hero" />
          </div>
        </div>
      </section>

      {/* Features Section - Smaller Cards */}
      <section className="section container">
        <h2 className="section-title">Our Services</h2>
        <p className="section-subtitle">Everything you need to build healthier habits</p>
        <div className="home-features-grid">
          {features.map((feature, index) => (
            <div key={index} className="home-feature-card">
              <img src={feature.image} alt={feature.title} />
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;