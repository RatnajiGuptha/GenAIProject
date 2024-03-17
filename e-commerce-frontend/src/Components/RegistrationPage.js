import React, { useState } from 'react';
import axios from 'axios';
import "../Styles/Registration.css";
import { Link } from 'react-router-dom';


const RegistrationForm = () => {
  const [user, setUser] = useState({
    userEmail: '',
    userPassword: '',
    firstName: '',
    lastName: '',
    mobile: ''
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.mobile.length !== 10) {
      setError('Mobile number must be 10 digits');
      return;
    }

    if (user.userPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/users/register', user);
      console.log(response.data);
      if (response.status === 201) {
        setSuccessMessage('User registered successfully!');
        setError('');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('User already exists');
      } else {
        setError('Error registering user');
      }
    }
  };

  return (
    <div className="registration-form">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name
          <input type="text" name="firstName" value={user.firstName} onChange={handleChange} required />
        </label>
        <label>
          Last Name
          <input type="text" name="lastName" value={user.lastName} onChange={handleChange} required />
        </label>
        <label>
          Mobile
          <input type="number" name="mobile" value={user.mobile} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input type="email" name="userEmail" value={user.userEmail} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="userPassword" value={user.userPassword} onChange={handleChange} required />
        </label>
        <div className="button-container">
          <button type="submit" className="primary">Register</button>
          <Link to="/">
            <button type="button" className="secondary">Back</button>
          </Link>
        </div>
      </form>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default RegistrationForm;
