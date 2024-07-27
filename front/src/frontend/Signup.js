import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Signup.css';

import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState(''); // New state for phone number
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const baseURL = 'https://tutor-scheduler-pro.vercel.app/';
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}api/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ first_name, last_name, email, password, phone_number }), // Include phoneNumber in the request
      });
      
      const data = await response.json();
      
      if (response.ok) {
        console.log('Signup successful:', data);
        navigate('/dashboard');
      } else {
        console.log('Signup failed:', data.message);
        const errorMessage = data.message || 'Failed to sign up';
        alert(errorMessage);
      }
      
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error, unable to sign up');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen student-signup-container items-center justify-center">
      <div className="signup-box">
        <h2 className="signup-title">Student Signup</h2>
        <form onSubmit={handleSubmit} className="signup-form space-y-4">
          <div>
            <label htmlFor="first_name" className="signup-label">First Name</label>
            <input
              type="text"
              id="first_name"
              value={first_name}
              onChange={(e) => setfirst_name(e.target.value)}
              className="signup-input"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <label htmlFor="last_name" className="signup-label">Last Name</label>
            <input
              type="text"
              id="last_name"
              value={last_name}
              onChange={(e) => setlast_name(e.target.value)}
              className="signup-input"
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="signup-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="signup-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="signup-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="signup-input"
                placeholder="Enter your password"
                required
              />
              <span className="input-group-addon">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="toggle-password"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </span>
            </div>
          </div>
          <div>
            <label htmlFor="phone_number" className="signup-label">Phone Number</label>
            <input
              type="tel"
              id="phone_number"
              value={phone_number}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="signup-input"
              placeholder="Enter your phone number"
              required
            />
          </div>
          <button type="submit" className="signup-button" style={{backgroundColor: "blue"}} >Sign Up</button>
          <div className="text-center">
            Already have an Account?
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="signup-button text-blue-500 underline"
            >
              Login
            </button>
          </div>
          <div className="text-center">
            Are you a Tutor/Instructor?
            <button
              type="button"
              onClick={() => navigate('/signupP')}
              className="signup-button text-blue-500 underline"
            >
              Click Here
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;

