import * as React from 'react';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';

function Login() {
    return (
        <Sheet
            sx={{
                width: 600,
                height: 400,
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
          <FormControl>
            <FormLabel sx={{
                fontSize: 'lg'
            }}>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="email@address.horse"
            />
          </FormControl>
          <FormControl>
            <FormLabel sx = {{
                fontSize: 'lg'
            }}>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
            />
          </FormControl>

          <Button sx={{ 
            mx: 'auto',
            my: 1,
            width: 150,
            height: 70,
            fontSize: 'lg'
            }}>Log in</Button>

          <Typography
            endDecorator={<Link href="/register">Sign up</Link>}
            fontSize="sm"
            sx={{ 
                alignSelf: 'center',
                
            }}
          >
            Don&apos;t have an account?
          </Typography>
        </Sheet>
    );
}

export default Login;