import { useState, useEffect } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import useFetch from '../hooks/useFetch.js'
import BACKEND_ADDRESS from '../index.js';
import Card from '@mui/joy/Card';

import './Login.css';

function Login() {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
    const { fetchMethod, loading, data, error } = useFetch(BACKEND_ADDRESS + "/users/auth", "POST", {
        email: email,
		password: password
    }, null);

	useEffect(() => {
		if(data !== null && error === null) {
			localStorage.setItem("token", data.accessToken);
			window.location.href = "/dashboard";
		}
	}, [loading, data, error]);

	function handleSubmit(e) {
		e.preventDefault();
		fetchMethod();
	}

    return (
        <Sheet color="primary" className="container">
			<div className="left box">
				<div className="logo-holder">
					<img className="logo" src="/images/logo.png"></img>
					<Typography className="logo-words">Public Eye</Typography>
				</div>
			</div>
			<form className="right box" onSubmit={(e) => handleSubmit(e)}>
				<Typography className="log-in">Login</Typography>

				<Input 
					className="input" 
					variant="soft" 
					color="neutral"
					placeholder="Email address"
				></Input>
				<Input 
					className="input" 
					variant="soft" 
					color="neutral"
					placeholder="Password"
				></Input>

				<Button className="submit">Submit</Button>
				<Typography className="no">Forgot Password?</Typography>
				<Typography className="no">Don't have an account? Register here</Typography>
			</form>
			
        </Sheet>
    );
}

export default Login;