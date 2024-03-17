import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation
import "../Styles/Header.css";
import { useNavigate } from 'react-router';

const Header = () => {

  const userName = localStorage.getItem('UserName');
  const navigate = useNavigate();

  const handleLogout = () => {
    
    localStorage.removeItem('UserName');
    localStorage.removeItem('UserEmail');
    navigate("/");
  };

  return (
    <header className="header">
      <nav className="nav">
        <Link to="/">Home</Link>
        {!userName && <Link to="/registration">Registration</Link>}
        {!userName && <Link to="/login">Login</Link>}
        {userName && <Link to="/cart">Cart</Link>}
        
        {userName && (
          <>
            <Link to="/orders">Orders</Link>
            <Link to="/change-password">Change Password</Link>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        )}

        <Link to="/contact">Contact Us</Link>
      </nav>
    </header>
  );
};

export default Header;
