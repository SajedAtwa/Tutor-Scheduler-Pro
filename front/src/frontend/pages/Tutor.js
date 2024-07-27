import React from 'react';
import { Helmet } from 'react-helmet';
import { FaChalkboardTeacher, FaBook, FaFlask, FaHistory } from 'react-icons/fa';
import "../styles/Tutor.css";
import { useNavigate } from 'react-router-dom';

const Tutor = () => {
  const navigate = useNavigate();

  return (
    <div className="about-us-container">
      <Helmet>
        <title>Tutor Scheduler Pro</title>
        <meta property="og:title" content="Tutor Scheduler Pro" />
      </Helmet>
      <div className="home-header">
        <header data-thq="thq-navbar" className="navbarContainer home-navbar-interactive">
          <span className="logo">Tutor Scheduler Pro</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links">
              <span className="home-nav" onClick={() => navigate('/')}>Home</span>
              <span className="home-nav bodySmall" onClick={() => navigate('/tutor')}>Service</span>
              <a
                href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="home-nav bodySmall">Contact Us</span>
              </a>
            </nav>

          </div>
    </header>
    </div>
    <div className="aboutcheck">
        <header className="hero-section">
          <h1>Welcome to Tutor Scheduler Pro</h1>
          <p>Your gateway to expert tutoring in Math, English, Science, History, and Foreign Language</p>
        </header>
        <section className="goals-section">
          <h2>Our Main Goals</h2>
          <div className="goal-cards">
            <div className="goal-card">
              <FaChalkboardTeacher className="goal-icon" />
              <h3>Expert Tutors</h3>
              <p>Providing access to experienced and qualified tutors in various subjects.</p>
            </div>
            <div className="goal-card">
              <FaBook className="goal-icon" />
              <h3>Personalized Sessions</h3>
              <p>Customized tutoring sessions to cater to individual student needs.</p>
            </div>
            <div className="goal-card">
              <FaFlask className="goal-icon" />
              <h3>Interactive Learning</h3>
              <p>Engaging and interactive sessions to make learning fun and effective.</p>
            </div>
            <div className="goal-card">
              <FaHistory className="goal-icon" />
              <h3>Comprehensive Coverage</h3>
              <p>Covering a wide range of subjects including Math, English, Science, and History.</p>
            </div>
          </div>
        </section>
        <section className="features-section">
          <h2>Why Choose Us?</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <h3>Flexible Scheduling</h3>
              <p>Schedule sessions at your convenience with our flexible booking system.</p>
            </div>
            <div className="feature-card">
              <h3>Affordable Rates</h3>
              <p>Quality education at prices that won't break the bank.</p>
            </div>
            <div className="feature-card">
              <h3>Proven Success</h3>
              <p>Helping students achieve their academic goals with proven methods.</p>
            </div>
          </div>
        </section>

      </div>
      </div>
  );
};

export default Tutor;

