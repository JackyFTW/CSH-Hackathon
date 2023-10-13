import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './dashboard/Dashboard';
import Auth from './auth/Auth';
import Found from './found/Found';
import Login from './auth/login/Login';
import Register from './auth/register/Register';

const BACKEND_ADDRESS = "https://jackb.dev/apiv2"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  	<BrowserRouter>
      	<Routes>
			<Route exact path="/"></Route>
        	<Route exact path="/" element={<Auth/>}>
				<Route exact path="login" element={<Login/>}/>
				<Route exact path="register" element={<Register/>}/>
			</Route>
        	<Route exact path="/dashboard" element={<Dashboard page="dashboard"/>}/>
        	<Route exact path="/dashboard/notifications" element={<Dashboard page="notifications"/>}/>
        	<Route exact path="/found/:uuid" element={<Found/>}/>
      	</Routes>
  	</BrowserRouter>
);

export default BACKEND_ADDRESS
