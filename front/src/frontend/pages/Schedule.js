import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Schedule.css';
import "../styles/S.css";
import 'bootstrap/dist/css/bootstrap.min.css';

function Schedule() {
  const navigate = useNavigate();
  const [services] = useState(['Math', 'English', 'Science', 'History', 'Foreign Language']);
  const [selectedService, setSelectedService] = useState('');
  const [classes, setClasses] = useState({});
  const [selectedClassId, setSelectedClassId] = useState('');

  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [cvc, setCvc] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cardholderFirstName, setCardholderFirstName] = useState('');
  const [cardholderLastName, setCardholderLastName] = useState('');
  const [addressOne, setAddressOne] = useState('');
  const [addressTwo, setAddressTwo] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

  const token = localStorage.getItem('token');

  const baseURLRaw = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';
  const baseURL = baseURLRaw.endsWith('/') ? baseURLRaw : `${baseURLRaw}/`;

  useEffect(() => {
    if (selectedService) {
      fetch(`${baseURL}api/users/classes/${encodeURIComponent(selectedService)}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(response => response.json())
        .then(data => {
          setClasses(data.data || {});
        })
        .catch(err => console.error('Failed to fetch class types', err));
    } else {
      setClasses({});
    }
  }, [selectedService, token, baseURL]);

  const handleClassSubmit = async (event) => {
    event.preventDefault();
    // Handle class selection submission if needed
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    if (!token) {
      alert('No token found, please log in');
      return;
    }

    const bookingData = {
      class_id: selectedClassId,
      creditCardNumber,
      cvc,
      expirationDate,
      cardholderFirstName,
      cardholderLastName,
      addressOne,
      addressTwo,
      city,
      state,
      zipcode
    };

    try {
      const response = await fetch(`${baseURL}api/users/payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        alert('Booking successful!');
        navigate('/billing');
      } else {
        const errorData = await response.json();
        alert('Failed to book: ' + errorData.message);
      }
    } catch (error) {
      alert('Network error, unable to complete booking');
    }
  };

  return (
    <div className='schedule-page'>
      <div className="home-header">
        <header className="navbarContainer home-navbar-interactive">
          <span className="logo">Tutor Scheduler Pro</span>
          <div className="home-desktop-menu">
            <nav className="home-links">
              <span className="home-nav" onClick={() => navigate('/')}>Home</span>
              <span className="home-nav bodySmall" onClick={() => navigate('/tutor')}>About Us</span>
              <span className="home-nav" onClick={() => navigate('/schedule')}>Book Appointment</span>
              <a href="https://www.youtube.com/watch?v=xvFZjo5PgG0" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span className="home-nav">Contact Us</span>
              </a>
            </nav>
            <button className="home-login buttonFlat" onClick={() => navigate('/entry')}>Logout</button>
          </div>
        </header>
      </div>

      <div className="Schedule">
        <h1 className="booking-form-header">Create Class Form</h1>
        <form onSubmit={handleClassSubmit}>
          <label>
            Subject:
            <select value={selectedService} onChange={e => setSelectedService(e.target.value)}>
              <option value="">Select a Subject</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
          </label>

          {selectedService && Object.entries(classes).map(([classType, classList]) => (
            <label key={classType}>
              {classType}:
              <select onChange={e => setSelectedClassId(e.target.value)}>
                <option value="">Select a Class</option>
                {classList.map(classItem => (
                  <option key={classItem.id} value={classItem.id}>
                    {`${classItem.name} - $${classItem.cost} - ${new Date(classItem.startTime).toLocaleString()} to ${new Date(classItem.endTime).toLocaleString()}`}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </form>

        {selectedClassId && (
          <form onSubmit={handlePaymentSubmit}>
            <h2>Payment Information</h2>

            <div className="input-row full-width">
              <input type="text" value={creditCardNumber} onChange={e => setCreditCardNumber(e.target.value)} placeholder="Credit Card Number" required />
              <input type="text" id='cvc' value={cvc} onChange={e => setCvc(e.target.value)} placeholder="CVC" required />
              <input type="month" value={expirationDate} onChange={e => setExpirationDate(e.target.value)} placeholder="Expiration Date" required />
            </div>

            <div className="input-row full-width">
              <input type="text" value={cardholderFirstName} onChange={e => setCardholderFirstName(e.target.value)} placeholder="Cardholder First Name" required />
              <input type="text" value={cardholderLastName} onChange={e => setCardholderLastName(e.target.value)} placeholder="Cardholder Last Name" required />
            </div>

            <div className="input-row full-width">
              <input type="text" value={addressOne} onChange={e => setAddressOne(e.target.value)} placeholder="Address Line 1" required />
              <input type="text" value={addressTwo} onChange={e => setAddressTwo(e.target.value)} placeholder="Address Line 2" />
            </div>

            <div className="input-row">
              <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="City" required />
              <input type="text" value={state} onChange={e => setState(e.target.value)} placeholder="State" required />
              <input type="text" value={zipcode} onChange={e => setZipcode(e.target.value)} placeholder="Zip Code" required />
            </div>

            <button type="submit">Submit Payment</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Schedule;