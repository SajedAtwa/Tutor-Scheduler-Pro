import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Question1 from '../frontend/question1';
import { useNavigate } from 'react-router-dom';
import math from '../frontend/pictures/math.jpg';
import science from '../frontend/pictures/science.jpg';
import english from '../frontend/pictures/english.jpg';
import history from '../frontend/pictures/history.jpg';
import spanish from '../frontend/pictures/spanish.jpg';
import offer from '../frontend/pictures/what.jpg';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  // Define your images and texts for the slideshow
  const slides = [
    { image: offer, text: 'Tutor Scheduler Pro' },
    { image: math, text: 'Math' },
    { image: science, text: 'Science' },
    { image: english, text: 'English' },
    { image: history, text: 'History' },
    { image: spanish, text: 'Spanish' },
  ];

  // State to manage current slide index
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="home-container">
      <Helmet>
        <title>Tutor Scheduler Pro</title>
        <meta property="og:title" content="Tutor Scheduler Pro" />
      </Helmet>
      <div className="home-header">
        <header data-thq="thq-navbar" className="navbarContainer home-navbar-interactive">
          <span className="logo">Tutor Scheduler Pro</span>
          <div data-thq="thq-navbar-nav" className="home-desktop-menu">
            <nav className="home-links">
              <span className="home-nav">Home</span>
              <span className="home-nav bodySmall" onClick={() => navigate('/tutor')}>
                About Us
              </span>
              <span className="home-nav bodySmall" onClick={() => navigate('/schedule')}>
                Book Appointment
              </span>
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
                      <button className="home-login buttonFlat" onClick={() => navigate('/entry')}>Logout</button>
                  </div>
          </div>
          <div data-thq="thq-burger-menu" className="home-burger-menu">
            <svg viewBox="0 0 1024 1024" className="home-icon socialIcons">
              <path d="M128 554.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 298.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667zM128 810.667h768c23.552 0 42.667-19.115 42.667-42.667s-19.115-42.667-42.667-42.667h-768c-23.552 0-42.667 19.115-42.667 42.667s19.115 42.667 42.667 42.667z"></path>
            </svg>
          </div>
          <div data-thq="thq-mobile-menu" className="home-mobile-menu1 mobileMenu">
            <div className="home-nav">
              <div className="home-top">
                <span className="logo">Tutor Scheduler Pro</span>
                <div data-thq="thq-close-menu" className="home-close-menu">
                  <svg viewBox="0 0 1024 1024" className="home-icon02 socialIcons">
                    <path d="M810 274l-238 238 238 238-60 60-238-238-238 238-60-60 238-238-238-238 60-60 238 238 238-238z"></path>
                  </svg>
                </div>
              </div>
              <nav className="home-links1">
                <span className="home-nav121">Home</span>
                <span className="home-nav221">Services</span>
                <span className="home-nav321">Book Appointment</span>
                <span className="home-nav421">About Us</span>
                <span className="home-nav521">Contact Us</span>
              </nav>
              <div className="home-buttons1">
                <button className="buttonFlat">Login</button>
                <button className="buttonFilled">Register</button>
              </div>
            </div>
            <div>
              <svg viewBox="0 0 950.8571428571428 1024" className="home-icon04 socialIcons">
                <path d="M925.714 233.143c-25.143 36.571-56.571 69.143-92.571 95.429 0.571 8 0.571 16 0.571 24 0 244-185.714 525.143-525.143 525.143-104.571 0-201.714-30.286-283.429-82.857 14.857 1.714 29.143 2.286 44.571 2.286 86.286 0 165.714-29.143 229.143-78.857-81.143-1.714-149.143-54.857-172.571-128 11.429 1.714 22.857 2.857 34.857 2.857 16.571 0 33.143-2.286 48.571-6.286-84.571-17.143-148-91.429-148-181.143v-2.286c24.571 13.714 53.143 22.286 83.429 23.429-49.714-33.143-82.286-89.714-82.286-153.714 0-34.286 9.143-65.714 25.143-93.143 90.857 112 227.429 185.143 380.571 193.143-2.857-13.714-4.571-28-4.571-42.286 0-101.714 82.286-184.571 184.571-184.571 53.143 0 101.143 22.286 134.857 58.286 41.714-8 81.714-23.429 117.143-44.571-13.714 42.857-42.857 78.857-81.143 101.714 37.143-4 73.143-14.286 106.286-28.571z"></path>
              </svg>
              <svg viewBox="0 0 877.7142857142857 1024" className="home-icon06 socialIcons">
                <path d="M585.143 512c0-80.571-65.714-146.286-146.286-146.286s-146.286 65.714-146.286 146.286 65.714 146.286 146.286 146.286 146.286-65.714 146.286-146.286zM664 512c0 124.571-100.571 225.143-225.143 225.143s-225.143-100.571-225.143-225.143 100.571-225.143 225.143-225.143 225.143 100.571 225.143 225.143zM725.714 277.714c0 29.143-23.429 52.571-52.571 52.571s-52.571-23.429-52.571-52.571 23.429-52.571 52.571-52.571 52.571 23.429 52.571 52.571zM438.857 152c-64 0-201.143-5.143-258.857 17.714-20 8-34.857 17.714-50.286 33.143s-25.143 30.286-33.143 50.286c-22.857 57.714-17.714 194.857-17.714 258.857s-5.143 201.143 17.714 258.857c8 20 17.714 34.857 33.143 50.286s30.286 25.143 50.286 33.143c57.714 22.857 194.857 17.714 258.857 17.714s201.143 5.143 258.857-17.714c20-8 34.857-17.714 50.286-33.143s25.143-30.286 33.143-50.286c22.857-57.714 17.714-194.857 17.714-258.857s5.143-201.143-17.714-258.857c-8-20-17.714-34.857-33.143-50.286s-30.286-25.143-50.286-33.143c-57.714-22.857-194.857-17.714-258.857-17.714zM877.714 512c0 60.571 0.571 120.571-2.857 181.143-3.429 70.286-19.429 132.571-70.857 184s-113.714 67.429-184 70.857c-60.571 3.429-120.571 2.857-181.143 2.857s-120.571 0.571-181.143-2.857c-70.286-3.429-132.571-19.429-184-70.857s-67.429-113.714-70.857-184c-3.429-60.571-2.857-120.571-2.857-181.143s-0.571-120.571 2.857-181.143c3.429-70.286 19.429-132.571 70.857-184s113.714-67.429 184-70.857c60.571-3.429 120.571-2.857 181.143-2.857s120.571-0.571 181.143 2.857c70.286 3.429 132.571 19.429 184 70.857s67.429 113.714 70.857 184c3.429 60.571 2.857 120.571 2.857 181.143z"></path>
              </svg>
            </div>
          </div>
        </header>
      </div>

      {/* Slideshow container */}
            <div className="slideshow-container">
        <div className="slideshow">
          {slides.map((slide, index) => (
            <div key={index} className={`slide ${index === currentSlide ? 'active' : ''}`}>
              <div className="slide-content">
                <img 
                  src={slide.image} 
                  alt={`Slide ${index + 1}`} 
                  className={index === 0 ? 'large-image' : ''} 
                />
                {index !== 0 && <div className="slide-text">{slide.text}</div>}
              </div>
            </div>
          ))}
        </div>
        <button className="prev" onClick={prevSlide}>&#10094;</button>
        <button className="next" onClick={nextSlide}>&#10095;</button>
      </div>

      {/* FAQ Section */}
    <div className="home-faq">
      <div className="faqContainer">
        <div className="home-faq1">
          <div className="home-container26">
            <span className="overline">
              <span>FAQ</span>
              <br />
            </span>
            <h2 className="home-text82 heading2">Common questions</h2>
            <span className="home-text83 bodyLarge">
              <span>
                Here are some of the most common questions that we get.
              </span>
              <br />
            </span>
          </div>
          <div className="home-container27">
            <Question1
              answer="Our tutoring sessions are charged at a rate of $20-$50 per hour."
              question="How much does each tutor session cost?"
            ></Question1>
            <Question1
              answer="You can easily book a tutoring appointment by selecting a date and time on our booking page and completing the payment process."
              question="How can I book a tutoring appointment?"
            ></Question1>
            <Question1
              answer="Yes, all our tutors are certified professionals with extensive experience in the field."
              question="Are the tutors certified professionals?"
            ></Question1>
            <Question1
              answer="Yes, you can reschedule or cancel your appointment up to 24 hours before the scheduled time. Please contact us for any changes."
              question="Can I reschedule or cancel my appointment?"
            ></Question1>
            <Question1
              answer="We accept major credit cards for payment of our tutoring services."
              question="What payment methods do you accept?"
            ></Question1>
          </div>
        </div>
      </div>
    </div>

      {/* Reviews Section */}
      <div className="home-reviews">
        <div className="reviewsContainer">
          <h2 className="home-reviews-heading">Reviews</h2>
          <div className="home-reviews-grid">
            <div className="home-review">
              <div className="review-stars">
                ★★★★★
              </div>
              <p>Absolutely fantastic experience! The tutors are incredibly knowledgeable and patient. They've helped me grasp concepts I struggled with for years. Scheduling is super flexible, which is perfect for my busy life. Highly recommend!</p>
              <span>- John Doe</span>
            </div>
            <div className="home-review">
              <div className="review-stars">
                ★★★★☆
              </div>
              <p>Top-notch service! The tutors here are experts and really know how to explain things clearly. The booking process is simple, and I appreciate the additional study materials provided. This site has been a huge help for me.</p>
              <span>- Jane Smith</span>
            </div>
            <div className="home-review">
              <div className="review-stars">
                ★★★★☆
              </div>
              <p>This tutor website has been fantastic. The quality of tutoring is excellent, and the flexible scheduling options make it easy to fit into my busy schedule. The additional resources are a great bonus. I couldn't be happier with the service!</p>
              <span>- Bob Johnson</span>
            </div>
            <div className="home-review">
              <div className="review-stars">
                ★★★★★
              </div>
              <p>The best tutoring experience I've ever had! The tutors are patient and really take the time to make sure you understand the material. The site is well-organized, and I love the flexibility of booking sessions. It's been a lifesaver for me</p>
              <span>- Alice Williams</span>
            </div>
          </div>
        </div>
      </div> 

      {/* Footer */}
      <div className="home-footer">
        <footer className="footerContainer home-footer1">
          <div className="home-container28">
            <span className="logo">Tutor Scheduler Pro</span>
            <nav className="home-nav1">
              <span className="bodySmall">Home</span>
              <span className="home-nav222 bodySmall">Services</span>
              <span className="home-nav322 bodySmall">Book Appointment</span>
              <span className="home-nav422 bodySmall">About Us</span>
              <span className="home-nav522 bodySmall">Contact Us</span>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
