import { Routes, Route } from 'react-router-dom';

import './bootstrap/bootstrap.css';
import './App.css';
import Logout from './components/Logout';
import Authentication from './pages/Authentication';
import About from './pages/About';
import Profile from './pages/Profile';
import HomePage from './pages/HomePage';
import Contactus from './pages/Contactus';
import Cart from './pages/Cart';
import Login from './components/Login';
import Register from './components/Register';
import Navbar from './elements/Navbar';

export default function App() {
  return (
    <Routes>
      <Route path="*" element={<div className='display-5 font-bolder text-center text-gp-primary'>404</div>} />

      <Route path="/" element={<Navbar />} >
        <Route path="" element={<HomePage />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="contact-us" element={<Contactus />} />
        <Route path="about-us" element={<About />} />
      </Route>

      <Route path="/" element={<Authentication />} >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="logout" element={<Logout />} />
    </Routes>
  );
}
