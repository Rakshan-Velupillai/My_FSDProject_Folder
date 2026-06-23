import React from 'react';
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import App from './App.jsx'

import "./css/homeBody.css"
import "./css/homeNavbar.css"
import "./css/auth.css"


import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/Store.js';

createRoot(document.getElementById('root')).render(
<Provider store={store}>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)
