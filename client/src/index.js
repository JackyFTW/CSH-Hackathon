import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import Login from './login/Login';
import Register from './register/Register';
import Found from './found/Found';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/register" element={<Register/>}/>
        <Route exact path="/dashboard" element={<Dashboard page="dashboard"/>}/>
        <Route exact path="/dashboard/notifications" element={<Dashboard page="notifications"/>}/>
        <Route exact path="/found/:uuid" element={<Found/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
