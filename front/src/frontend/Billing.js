// Billing.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Billing.css';

function Billing() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="app">
      <div className="message-box">
        <h1>Congratulations!</h1>
        <p>You have successfully booked a class.</p>
        <button onClick={goToDashboard}>Go to Dashboard</button>
      </div>
    </div>
  );
}

export default Billing;