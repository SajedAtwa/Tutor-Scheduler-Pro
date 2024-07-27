import React from "react";
import img3 from "../pictures/img3.jpg";
import logo from "../pictures/logo.png";
import bulb from "../pictures/bulb.png";
import question from "../pictures/question.png";
import shop from "../pictures/shop.png";
import "../styles/FinanceFuel.css";
import Dropdown from 'react-bootstrap/Dropdown';
import "../styles/S.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Financefuel() {
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
    <div className="flex flex-wrap justify-center items-center text-blue-900 h-screen">
      <div className="w-1/3 flex justify-between order-1">
        <img src={logo} alt="Logo" className="w-5 h-14 mb-2" style={{width: '100px', height: '100px', marginTop: '0px', marginLeft: '48%'}}/>
        <p className="text-blue-900 aerotow-font my-auto" style={{width: '100px', fontSize: '50px', marginTop: '0px', marginLeft: '40%'}}>
          FINANCEFUEL</p>
    
        <div className="w-1/3 h-60">
        <img src={img3} alt="Image 3" className="w-full h-full object-cover" style={{width: '100%', height: '550px'}} />
        </div>
      </div>

      <div className="w-full lg:w-1/3 px-4 order-3 lg:order-2">
        <div className="bg-white p-4 lg:mt-16">
        <div className="flex flex-col space-y-4 " >
        <p className="text-xl font-semibold left-font" style={{fontSize: '45px'}}>
            WHAT & WHY?</p>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 flex justify-center items-center p-4">
              <img src={bulb} alt="Icon 1" className="w-8 h-8 mr-2" style={{width: '150px', height: '150px', marginLeft: '80%'}}/> 
              <p className="text-blue-900 " style={{width: '1000px', fontSize: '26px', marginTop: '0%'}}>
                Advising Sessions Catered to The Customers Needs
              </p>
              <p className="text-blue-900" style={{width: '1000px', fontSize: '20px'}}>
              At Finance Fuel our first priority is the customer. We recognize the need for catered sessions which suits your needs and life style. Our professionals are dedicated to providing sessions for families interested in stocks and investments.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 flex justify-center items-center p-4">
              <img src={question} alt="Icon 2" className="w-8 h-8 mr-2" style={{width: '150px', height: '150px', marginLeft: '80%'}}/> 
              <p className="text-blue-900" style={{width: '1000px', fontSize: '26px'}}>
                User needs to manage their appointments & advisors can manage customers.
              </p>
              <p className="text-blue-900" style={{width: '1000px', fontSize: '20px'}}>
              We value your time and make the appointment process as seemless as possible. Our experienced professionals work with you to provide convenient appointments, which you can update, cancel, or book at any time. Not a customer? Join our team of experienced professionals to experience a wonderful diverse community dedicated to providing financial guidance.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 flex justify-center items-center p-4">
              <img src={shop} alt="Icon 3" className="w-8 h-8 mr-2" style={{width: '150px', height: '150px', marginLeft: '80%'}}/> 
              <p className="text-blue-900" style={{width: '1000px', fontSize: '26px'}}>
                Users can easily find & book appointments with finance experts for personalized assistance.
              </p>
              <p className="text-blue-900" style={{width: '1000px', fontSize: '20px'}}>
              Customers browse through our user friendly lists for their preferred specialty or sessions, and select the most convenient appointment. Once booked, user receives a confirmation message, and both parties are notified. We also provide consistent reminders leading up to your appointment so you never miss your session!
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/3 px-4 order-last">
        <div className="bg-white p-4 lg:mt-10">
          <div className="flex flex-col space-y-4 ">
            <p className="text-xl font-semibold left-font" style={{fontSize: '30px'}}>
              WHY FINANCEFUEL?</p>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
            <p className="text-xl font-semibold left-font" style={{fontSize: '22px'}}>
                Convenience:</p>
              <p className="text-sm text-blue-900 right-font" style={{fontSize: '20px'}}>
                Access personalized financial advice anytime, anywhere.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
            <p className="text-xl font-semibold left-font" style={{fontSize: '22px'}}>
                Affordability:</p> 
              <p className="text-sm text-blue-900 right-font" style={{fontSize: '20px'}}>
                Pay for advice only when you need it, by the hour.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
              <p className="text-xl font-semibold left-font" style={{fontSize: '22px'}}>
              Expertise: </p> 
              <p className="text-sm text-blue-900 right-font" style={{fontSize: '20px'}}>
                Gain insights from experienced financial advisors tailored to your needs.
              </p>
            </div>
            <div className="bg-gray-100 border border-blue-100 rounded-lg shadow-lg shadow-blue-100 p-4">
              <p className="text-xl font-semibold left-font" style={{fontSize: '22px'}}>
                Enhanced Engagement:
                </p> 
              <p className="text-sm text-blue-900 right-font" style={{fontSize: '20px'}}>
                Reach users at crucial financial moments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default Financefuel;