import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import './Login.css'; // Ensure the path to your CSS file is correct
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const baseURL = 'https://tutor-scheduler-pro.vercel.app/';
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${baseURL}api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
  
      if (response.ok) {
        console.log('Login successful:', data);
        // Assuming you want to save the token somewhere like localStorage
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
      } else {
        console.log('Login failed:', data.message);
        const errorMessage = data.message || 'Failed to log in';
        alert(errorMessage);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error, unable to login');
    }
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen student-login-container items-center justify-center">
      <div className="login-box">
        <h2 className="login-title">Student Login</h2>
        <form onSubmit={handleSubmit} className="login-form space-y-4">
          <div>
            <label htmlFor="email" className="login-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="login-input"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="login-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="login-input"
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
          <button type="submit" className="login-button" style={{backgroundColor: "blue"}}>Login</button>
          <div className="text-center">
            New Here? 
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="signup-button text-blue-500 underline"
            >
              Sign Up / Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

