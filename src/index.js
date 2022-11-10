import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CartProvider } from "react-use-cart";
import { ContectsAPI } from './elements/ContectsAPI';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename="/xenonstack">
    <CartProvider>
      <ContectsAPI>
        <App />
      </ContectsAPI>
    </CartProvider>
  </BrowserRouter>
);
