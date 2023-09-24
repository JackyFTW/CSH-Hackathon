import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Grid from '@mui/joy/Grid';

function Register() {
    return (
        <Sheet 
            sx={{
                width: 600,
                height: 500,
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
                }}>Please fill in the information to continue.</Typography>

                <Grid
                    container
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
                                placeholder="Frederick"
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
                                placeholder="Baptiste"
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
                                placeholder="email@address.horse"
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
                                placeholder="911"
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
                                placeholder="123456789"
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
                                type="passwordConfirm"
                                placeholder="123456789"
                            />
                        </FormControl>
                    </Grid>
                </Grid>

                



                <Button sx={{ 
                    mx: 'auto',
                    my: 1,
                    width: 200,
                    height: 70,
                    fontSize: 'lg'
                }}>Create Account</Button>
        </Sheet>
    );
}

export default Register;