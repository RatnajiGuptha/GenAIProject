import './App.css';
import RegistrationPage from './Components/RegistrationPage';
import LoginForm from './Components/LoginForm';
import Header from './Components/Header';
import ProductList from './Components/ProductList';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from './Components/CartPage';
import PasswordChangeForm from './Components/PasswordChangeForm';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<ProductList />}></Route>
            <Route path="/login" element={<LoginForm />}></Route>
            <Route path='/registration' element={<RegistrationPage />}></Route>
            <Route path='/cart' element={<CartPage />} ></Route>
            <Route path='/change-password' element={<PasswordChangeForm/>}></Route>
          </Routes>
        </div>
      </Router>

    </div>
  );
}

export default App;
