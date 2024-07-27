import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';

import './frontend/style.css'; // Make sure the path to your CSS file is correct
import Home from './frontend/home';
import NotFound from './frontend/not-found';
import Login from './frontend/Login'; // Import the Login component, adjust the path as necessary
import Signup from './frontend/Signup';
import Dashboard from './frontend/Dashboard';
import FurssanFC from './frontend/pages/FurssanFC';
import HomeFlavors from './frontend/pages/HomeFlavors';
import Schedule from './frontend/pages/Schedule';
import Billing from './frontend/Billing';
import Provider from './frontend/Provider';
import Financefuel from './frontend/pages/Financefuel';
import SignupP from './frontend/SignupP';
import LoginP from './frontend/LoginP';
import Class from './frontend/Class';
import C from './frontend/C';
import Entry from './frontend/entry';
import EntryT from './frontend/entryT';
import Tutor from './frontend/pages/Tutor';
// Example function placeholders, replace with your actual logic
const handleLogin = (username, password) => {
  console.log("Logging in with:", username, password);
  // Add your login logic here (e.g., API call)
};

const navigateToSignup = () => {
  // Use your routing library (e.g., React Router) to navigate to the signup page
  console.log("Navigating to signup page");
};
const handleSignup = (email,username,dateOfBirth, password, confirmPassword) => {
  console.log("Logging in with:", email, username,dateOfBirth, password,confirmPassword);
  // Add your login logic here (e.g., API call)
};
const navigateToLogin = () => {
  // Use your routing library (e.g., React Router) to navigate to the signup page
  console.log("Navigating to login page");
};
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onNavigateToSignup={navigateToSignup} />} />
        <Route path="/signup" element={<Signup/>}/>
        <Route path="*" element={<NotFound onLogin={handleSignup} onNavigateToSignup={navigateToLogin}/>} />
        <Route path="/home" element={<Navigate replace to="/" />} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/FurssanFC" element={<FurssanFC/>} />
        <Route path="/HomeFlavors" element={<HomeFlavors/>} />
        <Route path="/Schedule" element={<Schedule/>} />
        <Route path="/Billing" element={<Billing/>} />
        <Route path="/Provider" element={<Provider/>} />
        <Route path="/Financefuel" element={<Financefuel/>} />
        <Route path="/signupP" element={<SignupP/>}/>
        <Route path="/loginP" element={<LoginP onLogin={handleLogin} onNavigateToSignup={navigateToSignup} />} />
        <Route path="/Class" element={<Class/>}/>
        <Route path="/C" element={<C/>}/>
        <Route path="/entry" element={<Entry/>}/>
        <Route path="/entryT" element={<EntryT/>}/>
        <Route path="/tutor" element={<Tutor/>}/>
      </Routes>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));




