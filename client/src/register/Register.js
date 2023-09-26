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
        <Sheet 
            sx={{
                width: 600,
                mx: 'auto', // margin left & right
                my: 10, // margin top & bottom
                py: 3, // padding top & bottom
                px: 3, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'lg',
                boxShadow: 'md',
            }} variant="outlined">
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
                <Typography level="body-lg" sx={{
                    mb: 3,
                    marginLeft: 'auto',
                    marginRight: 'auto'
                }}>{tip}</Typography>

                <form onSubmit={(e) => {handleSubmit(e)}}>
                    <Grid container
                        rowSpacing={3}
                        columnSpacing={7}
                        sx={{ width: '100%' }}
                        margin='auto'
                        justifyContent="space-between"
                    >
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

                    <Button type="submit" sx={{ 
                        display: 'flex',
                        mx: 'auto',
                        my: 1,
                        width: 200,
                        height: 70,
                        fontSize: 'lg'
                    }}>Create Account</Button>
                </form>
        </Sheet>
    );
}

export default Register;