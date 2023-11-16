import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import Parse from 'parse/dist/parse.min.js';

const PARSE_APPLICATION_ID = 'SkB4EbitycaKhaamgOXH6VSIF8v9wALZX8BdrVAY';
const PARSE_HOST_URL = 'https://parseapi.back4app.com/';
const PARSE_JAVASCRIPT_KEY = 'm5BftvHxXy2m3GdT1OhQL32BVIIBWp1WjESfiosZ';

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
