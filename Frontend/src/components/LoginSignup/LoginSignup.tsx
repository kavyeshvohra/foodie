import Drawer from '@mui/material/Drawer'
import './LoginSignup.css'
import { Close } from '@mui/icons-material'
import { useState } from 'react'
const LoginSignup = ({isDrawerOpen, toggleDrawer}) =>{
    
    const[currentState, setCurrentState] = useState('Login');
    return(
        <>
            <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer}>
                <div className='login-signup-wrapper'>
                <Close onClick={toggleDrawer} sx={{marginBottom: '12px',cursor: 'pointer'}}/>
                    <div className="login-signup-header">
                        {
                            currentState==='Login'
                            ?
                            <>
                                <h3>Login</h3>
                                <p>or <span onClick={()=>setCurrentState('Sign Up')}>create an account</span></p>
                            </>
                            :
                            <>
                                <h3>Sign Up</h3>
                                <p>or <span onClick={()=>setCurrentState('Login')}>login to your account</span></p>
                            </>
                        }
                    </div>
                    <div className="login-signup-form">
                        {currentState==='Login'?
                        <>
                            <input type="tel" className='form-fields' placeholder='Phone Number' name="phone" id="phone"/>
                        </>
                        :
                        <>
                            <input type="tel" className='form-fields' placeholder='Phone Number' name="phone" id="phone"/>
                            <input type='text' className='form-fields' placeholder='Full Name' name='name' id='name'/>
                            <input type='email' className='form-fields' placeholder='Email' name='email' id='email'/>
                        </>
                        }
                    </div>
                    <button type='submit'>{currentState==='Sign Up'?'Create Account':'Login'}</button>
                    <div className="login-condition">
                        <p>By continuing, I accept the Terms of use & Privacy Policy</p>
                    </div>
                </div>   
            </Drawer>
            
        </>
    )
}
export default LoginSignup