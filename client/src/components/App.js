import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import UploadProductPage from './views/UploadProductPage/UploadProductPage';
import DetailProductPage from './views/DetailProductPage/DetailProductPage';
import CartPage from './views/CartPage/CartPage';
import HistoryPage from './views/HistoryPage/HistoryPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{ paddingTop: '69px', minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={React.createElement(Auth(LandingPage, null))} />
          <Route path="/login" element={React.createElement(Auth(LoginPage, false))} />
          <Route path="/register" element={React.createElement(Auth(RegisterPage, false))} />
          <Route path="/product/upload" element={React.createElement(Auth(UploadProductPage, true))} />
          <Route path="/product/:productId" element={React.createElement(Auth(DetailProductPage, null))} />
          <Route path="/user/cart" element={React.createElement(Auth(CartPage, true))} />
          <Route path="/user/history" element={React.createElement(Auth(HistoryPage, true))} />
        </Routes>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
