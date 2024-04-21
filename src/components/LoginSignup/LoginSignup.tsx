import Drawer from '@mui/material/Drawer'
import './LoginSignup.css'
import { Close } from '@mui/icons-material'
const LoginSignup = ({isDrawerOpen, toggleDrawer}) =>{
    
    return(
        <>
            <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer}>
                <div className='login-signup-wrapper'>
                <Close onClick={toggleDrawer} sx={{marginBottom: '12px',cursor: 'pointer'}}/>
                    <div className="login-signup-header">
                        <h3>Login</h3>
                        <p>or create an account</p>
                    </div>
                    <div className="login-signup-form">
                        
                    </div>
                </div>   
            </Drawer>
            
        </>
    )
}
export default LoginSignup