import { useState, useEffect } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import useFetch from '../hooks/useFetch.js'

function Login() {
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
    const { fetchMethod, loading, data, error } = useFetch("http://localhost:9090/apiv2/users/auth", "POST", {
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
        <Sheet
            sx={{
                width: 600,
                mx: 'auto',
                my: 10,
                py: 3,
                px: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'lg',
                boxShadow: 'md',
            }}
        	variant="outlined"
		>
            <div style={{
                width: '65%',
                aspectRatio: '2374/414',
                marginLeft: 'auto',
                marginRight: 'auto'
                }}> 
                <img alt="logo" src="/images/logo.png" style={{
                    width: '100%',
                    height: '100%'
                }}/>
            </div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<FormControl sx={{ mb: 4 }}>
            		<FormLabel sx={{fontSize: 'lg'}}>Email</FormLabel>
            		<Input
              			name="email"
              			type="email"
              			placeholder="example@gmail.com"
						onChange={(e) => setEmail(e.target.value)}
            		/>
          		</FormControl>
          		<FormControl>
            		<FormLabel sx = {{fontSize: 'lg'}}>Password</FormLabel>
            		<Input
              			name="password"
              			type="password"
              			placeholder="Type password..."
						onChange={(e) => setPassword(e.target.value)}
            		/>
          		</FormControl>

         		<Button type="submit" sx={{ 
                    display: 'flex',
            		mx: 'auto',
            		my: 2,
            		width: 150,
            		height: 70,
            		fontSize: 'lg'
            	}}>Log in
                </Button>

          		<Typography
            		endDecorator={<Link href="/register">Sign up</Link>}
            		fontSize="sm"
            		sx={{ 
                        display: 'flex',
                        justifyContent: 'center'
        			}}>Don&apos;t have an account?
                </Typography>		
			</form>
        </Sheet>
    );
}

export default Login;