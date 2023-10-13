import { Routes, Route } from "react-router-dom";
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Login from './login/Login';
import Register from './register/Register';

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
            <Routes>
        	    <Route exact path="/login" element={<Login/>}/>	
        	    <Route exact path="/register" element={<Register/>}/>
      	    </Routes>
        </Sheet>
    );
}

export default Auth;