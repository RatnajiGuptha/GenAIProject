// PasswordChangeForm.jsx

import React, { useState } from 'react';
import axios from 'axios';

const PasswordChangeForm = () => {
    const [password, NewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const email = localStorage.getItem("UserEmail");

    const handleChangePassword = async () => {
        if (password !== confirmPassword) {
            setErrorMessage("Passwords don't match");
            return;
        }


        // Call the API to change the password using Axios
        try {
            const response = await axios.post('http://localhost:8080/users/changePassword', {
                email, password,
            });

            // Handle response from the API
            if (response.status === 201) {
                setErrorMessage('');
                // Password changed successfully, you can redirect or show a success message
                console.log('Password changed successfully');
            } else {
                setErrorMessage(response.data.message || 'An error occurred');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            setErrorMessage('An unexpected error occurred');
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            <p>User Email: {email}</p>

            <label>New Password:</label>
            <input
                type="password"
                value={password}
                onChange={(e) => NewPassword(e.target.value)}
            />

            <label>Confirm Password:</label>
            <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );
};

export default PasswordChangeForm;
