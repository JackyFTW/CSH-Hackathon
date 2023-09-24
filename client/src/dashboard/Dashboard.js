import Box from '@mui/system/Box'
import Navbar from '../components/Navbar'
import Items from './Items'

function Dashboard(props) {
    let content;
    if(props.page === "dashboard") {
        content = <Items/>;
    } else {
        content = "";
    }

    return (
        <Box display="flex" minHeight="100vh">
            <Navbar page={ props.page }></Navbar>
            <Box component="main" sx={{
                height: '100vh',
                width: '100%',
            }}>
                {content}
            </Box>
        </Box>
    )
}

export default Dashboard;