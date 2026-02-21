import React from "react";
import { useNavigate } from 'react-router-dom';
import './C.css'; // Make sure to create a corresponding CSS file

function C() {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/Class');
  };

  return (
      <div className="app">
        <div className="message-box">
          <h1>Congratulations!</h1>
          <p>You have successfully created a class.</p>
          <button onClick={goToDashboard}>Go to Dashboard</button>
        </div>
      </div>
    
  );
}

export default C;