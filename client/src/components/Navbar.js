import Sheet from '@mui/joy/Sheet';
import Box from '@mui/system/Box';
import List from '@mui/joy/List';
import Divider from '@mui/joy/Divider';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';

import './Navbar.css';

function Navbar(props) {
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
                        width: '200px'
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
            </Sheet>
        </div>
    );
}

export default Navbar;