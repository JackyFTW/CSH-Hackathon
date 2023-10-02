import { useState, useEffect } from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';
import useFetch from '../hooks/useFetch.js'
import BACKEND_ADDRESS from '../index.js';

import './Register.css'

function Register() {
    const [ tip, setTip ] = useState("Please fill in the information to continue.");
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ phoneNumber, setPhoneNumber ] = useState("");
    const [ password, setPassword ] = useState("");
    const { fetchMethod, loading, data, error } = useFetch(BACKEND_ADDRESS + "/users", "POST", {
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
        phoneNumber: phoneNumber
    }, null);

    useEffect(() => {
        if(data !== null && error === null) {
            window.location.href = "/";
        } else if(error !== null) {
            setTip(error.error);
        }
    }, [loading, data, error]);

    function handleSubmit(e) {
        e.preventDefault();
        fetchMethod();
    }
 
    return (
        <Sheet color="primary" className="container">
            <form className="left box" onSubmit={(e) => handleSubmit(e)}>
                <Typography className="log-in">Register</Typography>

                <Grid container>
                    <Grid>
                        <FormControl>
                            <FormLabel sx={{
                                fontSize: 'lg'
                            }}>First Name</FormLabel>
                            <Input
                                name="firstName"
                                type="firstName"
                                placeholder="John"
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl>
                            <FormLabel sx={{
                                fontSize: 'lg'
                            }}>Last Name</FormLabel>
                            <Input
                                name="lastName"
                                type="lastName"
                                placeholder="Smith"
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl>
                            <FormLabel sx={{
                                fontSize: 'lg'
                            }}>Email Address</FormLabel>
                            <Input
                                name="email"
                                type="email"
                                placeholder="example@gmail.com"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl>
                            <FormLabel sx={{
                                fontSize: 'lg'
                            }}>Phone Number</FormLabel>
                            <Input
                                name="phoneNumber"
                                type="phoneNumber"
                                placeholder="800-000-0000"
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl>
                            <FormLabel sx={{
                                fontSize: 'lg'
                            }}>Password</FormLabel>
                            <Input
                                name="password"
                                type="password"
                                placeholder="Type password..."
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </FormControl>
                    </Grid>
                    <Grid>
                        <FormControl>
                            <FormLabel sx={{
                                fontSize: 'lg'
                            }}>Confirm Password</FormLabel>
                            <Input
                                name="passwordConfirm"
                                type="password"
                                placeholder="Confirm password..."
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                <Button className="submit">Create Account</Button>
                <Typography className="no">Forgot Password?</Typography>
                <Typography className="no">Don't have an account? Register here</Typography>
            </form>
            <div className="right box">
				<div className="logo-holder">
					<img className="logo" src="/images/logo.png"></img>
					<Typography className="logo-words">Public Eye</Typography>
				</div>
			</div>
        </Sheet>
    );
}

export default Register;