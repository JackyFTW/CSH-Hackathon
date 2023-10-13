import { useState, useEffect } from 'react';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import useFetch from '../../hooks/useFetch.js'
import BACKEND_ADDRESS from '../../index.js';

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
		<form className="right box" onSubmit={(e) => handleSubmit(e)}>
			<Typography className="title">Login</Typography>
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
    );
}

export default Login;