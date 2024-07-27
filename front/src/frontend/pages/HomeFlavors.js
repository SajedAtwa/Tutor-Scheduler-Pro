import React from "react";
import "../styles/HomeFlavors.css";
import cooking1 from "../pictures/breakfast.jpg";
import cooking2 from "../pictures/cooking2.jpg";
import left_food from "../pictures/food1.avif";
import left_food2 from "../pictures/food2.jpg";
import tip1 from "../pictures/tip1.png";
import tip2 from "../pictures/tip2.png";
import tip3 from "../pictures/tip3.png";
import Dropdown from 'react-bootstrap/Dropdown';
import "../styles/S.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function HomeFlavors() {
  const navigate = useNavigate();
  return (
    <div>
    <div className="home-header">
      <header className="navbarContainer home-navbar-interactive">
        <span className="logo">Life Balance</span>
        <div className="home-desktop-menu">
          <nav className="home-links">
            <span className="home-nav" onClick={() => navigate('/')}>Home</span>
            <Dropdown>
              <Dropdown.Toggle variant="" id="dropdown-basic">Services</Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => navigate('/FurssanFC')}>Furssan FC</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/HomeFlavors')}>Home Flavors</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/FinanceFuel')}>Finance Fuel</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <span className="home-nav" onClick={() => navigate('/schedule')}>Book Appointment</span>
            <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
              <span className="home-nav">Contact Us</span>
            </a>
          </nav>
        </div>
      </header>
      </div>
    <div className="home">
      <div className="main-title" id="main-title">
        <div className="title">
          <h1>Home Flavors</h1>
          <p>"Discover your passion"</p>
        </div>
      </div>

      <div className="review1" id="review1">
    </div>

    <div className="review2" id="review2">
    </div>

      <div className="services" id="services">
        <h1 class="services_title"> Services </h1>
        <p>Discover a variety of class sizes designed to cater to your individual preferences at Home Flavors. Whether you're 
          looking for the intimate experience of a 1-on-1 session, our made for two Duos Class, or the opportunity to make memories in 
          our Family-sized class, we have options to suit every need. Striving to master a new skill, pursue a 
          hobby, or cherish moments with loved ones? Our dedicated staff is here to ensure your experience is nothing short of 
          exceptional. With personalized attention and expert guidance, your journey with us will be truly unforgettable.</p>
          <div id="service-1">Cuisine Specialties:</div>
          <div id="service-2">Mexican</div>
          <div id="service-3">Thai</div>
          <div id="service-4">Chinese</div>
          <div id="service-5">American</div>
          <div id="service-6">Korean</div>
          <div id="service-7">Italian</div>
          <div id="service-8">Greek</div>
        <img  id = "right_food" src= {cooking1} alt=""/>
        <img  id = "right_food2" src= {cooking2} alt=""/>
        <img  id = "left_food" src= {left_food} alt=""/>
        <img  id = "left_food2" src= {left_food2} alt=""/>
      </div>

      <div className="info" id="info">
      <div id="info-title">Home Flavor's Fresh Tips:</div>
      <div id="info-sub">Freshly baked advice for first-timers! New to our classes, don't worry we have you covered. Here is some
      expert advice from previous chefs and our welcoming staff!</div>
      <div id="info-recommendations" >Class Recommendations:</div>
      <div id="info-class1"> 1-1: Beginners Guide to Thai</div>
      <div id="info-class2"> Family Class: Beginners Guide to Meals The Whole Family Can Love</div>
      <img  id = "tip1" src= {tip1} alt=""/>
      <img  id = "tip2" src= {tip2} alt=""/>
      <img  id = "tip3" src= {tip3} alt=""/>
      <div id="info-class3"> Duos Class: The Art of Greek for Beginners</div>
      </div>
      
      <div className="contact" id="contact">
      <div id="contact-title">Contact Us:</div>
      <div id="contact-number">Phone Number: 718-293-1029</div>
      <div id="contact-email">Email: homeflavors@gmail.com</div>
      </div>
      </div>
      </div>
      
  );
}

export default HomeFlavors;