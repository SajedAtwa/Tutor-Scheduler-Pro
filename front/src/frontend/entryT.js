import React from "react";
import './entry.css';
import { FaUserGraduate, FaChalkboardTeacher } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './home.css';

function EntryT() {
  const navigate = useNavigate();
    return (
        <div className="login-page">
            <div className="home-header">
        <header data-thq="thq-navbar" className="navbarContainer home-navbar-interactive">
          <span className="logo">Tutor Scheduler Pro</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links">
              <span className="home-nav" onClick={() => navigate('/')}>Home</span>
              <span className="home-nav bodySmall" onClick={() => navigate('/tutor')}>About Us</span>
              <a
                href="https://www.youtube.com/watch?v=xvFZjo5PgG0"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="home-nav bodySmall">Contact Us</span>
              </a>
            </nav>
            <div className="home-buttons">
              <button className="home-login buttonFlat" onClick={() => navigate('/entry')}>
                Login
              </button>
              <button className="home-register buttonFilled" onClick={() => navigate('/entryT')}>
                Register
              </button>
            </div>
          </div>
        </header>
      </div>
            <div className="login-box">
                <h2>Signup</h2>
                <div className="login-buttons">
                    <button className="login-button student-login" onClick={() => navigate('/Signup')}>
                        <FaUserGraduate className="icon" />
                        Student Signup
                    </button>
                    <button className="login-button tutor-login" onClick={() => navigate('/SignupP')}>
                        <FaChalkboardTeacher className="icon" />
                        Tutor/Instructor Signup
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EntryT;