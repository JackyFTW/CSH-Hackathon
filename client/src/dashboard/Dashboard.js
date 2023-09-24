import Box from '@mui/system/Box'
import Navbar from '../components/Navbar'

function Dashboard(props) {
    return (
        <Box display="flex" minHeight="100vh">
            <Navbar page={ props.page }></Navbar>
            <Box component="main" sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100vh'
            }}>
                <h1>Test</h1>
                <h2>Test 2</h2>
            </Box>
        </Box>
    )
}

export default Dashboard;