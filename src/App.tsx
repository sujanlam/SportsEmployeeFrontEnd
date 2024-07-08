import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from './nav-bar/nav-menus/LoginPage';
import { NavBar } from './nav-bar/NavBar';
import { Footer } from './header-footer/Footer';
import { Home } from './nav-bar/nav-menus/Home';
import { Products } from './nav-bar/nav-menus/Products';
import { Purpose } from './nav-bar/nav-menus/Purpose';
import { AboutUs } from './nav-bar/nav-menus/AboutUs';
import { Careers } from './nav-bar/nav-menus/Careers';
import { Contact } from './nav-bar/nav-menus/Contact';
import { RegisterPage } from './nav-bar/nav-menus/Register';

export default function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login-signup" element={<LoginPage />}/>
        <Route path="/products" element={<Products />} />
        <Route path="/purpose" element={<Purpose />}/>
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/careers" element={<Careers />}/>
        <Route path="/contact-us" element={<Contact />}/>
        <Route path="/login-signup" element={<LoginPage />}/>
        <Route path="/register" element={<RegisterPage />}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
