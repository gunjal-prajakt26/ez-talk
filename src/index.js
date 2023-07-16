import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { makeServer } from "./server";
import { DataContext, DataProvider } from './Context/DataContext';
import { AuthContext, AuthProvider } from './Context/AuthConetxt';

// Call make Server
makeServer();
const root = ReactDOM.createRoot(document.getElementById('root'));

export {DataContext, AuthContext};

root.render(
  <React.StrictMode>
  <Router>
  <AuthProvider>
  <DataProvider>
    <App />
    </DataProvider>
    </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
