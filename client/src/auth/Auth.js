import { Outlet } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';

import './Auth.css';

function Auth() {
    return (
        <Sheet variant="outlined" className="container" sx={{ boxShadow: 'lg' }}>
			<div className="left box">
				<div className="logo-holder">
					<img className="logo" src="/images/logo.png"></img>
					<Typography className="logo-words">Public Eye</Typography>
				</div>
			</div>
            <Outlet/>
        </Sheet>
    );
}

export default Auth;