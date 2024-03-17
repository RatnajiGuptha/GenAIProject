import React, { useState } from 'react';
import "../Styles/Login.css";
import ForgetPassword from './ForgetPassword';
import axios from 'axios';
import { useNavigate } from 'react-router';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isForgetPasswordOpen, setForgetPasswordOpen] = useState(false);
  const navigate = useNavigate();

  const handleResetPassword = (email, password) => {
 
    console.log(`Reset password for email: ${email}, new password: ${password}`);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login submitted:', { email, password });
    try {
      const response = await axios.post('http://localhost:8080/users/login', {email,password});
      console.log(response.data); 
      localStorage.setItem("UserEmail",email);
      localStorage.setItem("UserName" , response.data.firstName);
      navigate("/")
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const handleForgotPassword = () => {
    // Handle forgot password logic here
    console.log('Forgot password');
  };

  return (

    <div className="login-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <div className="button-container">
          <button type="submit">Login</button>
          <button onClick={() => setForgetPasswordOpen(true)}>Forget Password</button>

      {isForgetPasswordOpen && (
        <ForgetPassword onClose={() => setForgetPasswordOpen(false)} onResetPassword={handleResetPassword} />
      )}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
