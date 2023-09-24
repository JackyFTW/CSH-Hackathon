import { useState, useEffect, useRef } from 'react';
import Sheet from '@mui/joy/Sheet';
import Box from '@mui/system/Box';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Card from '@mui/material/Card';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import useFetch from '../hooks/useFetch.js';

import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import './Navbar.css';

function Navbar(props) {
    const token = localStorage.getItem("token");

    const [ email, setEmail ] = useState("example@gmail.com");

    const { fetchMethod: fetchSelfUser, loading, data, error } = useFetch("http://localhost:9090/apiv2/users", "GET", {}, token);

    let mounted = useRef(false);
    useEffect(() => {
        if(mounted.current) return;
        fetchSelfUser();
        mounted.current = true;
    }, []);
    useEffect(() => {
        if(data !== null) {
            setEmail(data.user.email);
        }
        mounted.current = true;
    }, [loading, data, error]);

    return (
        <div>
            <Sheet
                color="neutral"
                sx={{
                position: 'sticky',
                zIndex: 9999,
                width: '350px',
                height: '100%',
                top: 0,
                flexShrink: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                borderRight: '1px solid',
                borderColor: 'divider'
            }}>
                <Box display="flex" justifyContent="center" sx={{
                    pt: 3
                }}>
                    <img src={process.env.PUBLIC_URL + '/images/logo.png'} alt="logo" style={{
                        width: '250px'
                    }}></img>
                </Box>
                <Divider/>
                <List size="md">
                    <ListItem>
                        <ListItemButton className="navbar-button" onClick={ () => window.location.href = "/dashboard" } selected={ props.page === "dashboard" }>
                            <ListItemDecorator>
                                <SpaceDashboardIcon/>
                            </ListItemDecorator>
                            <ListItemContent>Dashboard</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemButton className="navbar-button" onClick={ () => window.location.href = "/dashboard/notifications" } selected={ props.page === "notifications" }>
                            <ListItemDecorator>
                                <NotificationsIcon/>
                            </ListItemDecorator>
                            <ListItemContent>Notifications</ListItemContent>
                        </ListItemButton>
                    </ListItem>
                </List>
                <Card>
                    <Button variant="outlined" sx={{
                        display: 'flex',
                        mx: 'auto',
                        my: 3,
                        height: 50,
                        borderRadius: 100
                    }}>
                        <AccountCircleIcon style={{
                            fontSize: 40
                        }}/>
                        <Typography sx={{
                            color: 'black',
                            margin: 4
                        }}>{email}
                        </Typography>
                    </Button>
                </Card>
            </Sheet>
        </div>
    );
}

export default Navbar;