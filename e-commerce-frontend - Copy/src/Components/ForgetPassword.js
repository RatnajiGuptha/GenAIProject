// ForgetPassword.js
import React, { useState } from 'react';
import "../Styles/ForgetPassword.css";

const ForgetPassword = ({ onClose, onResetPassword }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const handleVerifyEmail = () => {
    // Implement logic to verify email existence here
    // For simplicity, assume email verification is successful
    setIsEmailVerified(true);
  };

  const handleResetPassword = () => {
    // Implement logic to reset password
    if (password === confirmPassword) {
      // Passwords match, save changes
      onResetPassword(email, password);
      onClose();
    } else {
      // Passwords don't match, handle accordingly
      alert('Passwords do not match. Please re-enter.');
    }
  };

  return (
    <div className="popup">
      <h2>Forget Password</h2>
      {!isEmailVerified ? (
        <>
          <p>Enter your email to verify:</p>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <button onClick={handleVerifyEmail}>Verify Email</button>
        </>
      ) : (
        <>
          <p>Enter your new password:</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p>Re-enter your new password:</p>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleResetPassword}>Reset Password</button>
        </>
      )}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ForgetPassword;
