import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ResetStyle from '../style/ResetStyle.js';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="546304361474-fp2tvm96c32m7jsakl4rnan4stse4jfm.apps.googleusercontent.com">
    <BrowserRouter>
    <ResetStyle/>
    <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
)
