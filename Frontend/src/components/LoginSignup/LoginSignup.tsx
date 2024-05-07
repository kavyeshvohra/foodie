'use client'
import Drawer from '@mui/material/Drawer'
import './LoginSignup.css'
import { Close, LineAxisOutlined } from '@mui/icons-material'
import { useState, useEffect,useContext } from 'react'
import OtpInput from 'react-otp-input'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import app from '../../api/_Firebase/clientApp'
import { useRouter } from "next/navigation"
import axios from 'axios'
import { StoreContext } from '@/context/StoreContext'

const LoginSignup = ({isDrawerOpen, toggleDrawer}) =>{
    const {token, setToken} = useContext(StoreContext);
    const[currentState, setCurrentState] = useState('Login');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    const url = process.env.NEXT_PUBLIC_API_URL
    const auth = getAuth(app);
    const router = useRouter();
    let fP = '';
    const[errorMessage,setErrorMessage] = useState('');
    const[infoMessage,setInfoMessage]=useState('');
    const[isLoading,setIsLoading] = useState(false);
    const handlePhoneNumberChange = (e) =>{
        setPhoneNumber(e.target.value);
    }
    const handleOTPChange = (e)=>{
        setOtp(e.target.value);
    }
    useEffect(()=>{
        window.RecaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container',{
            'size':'invisible',
            'callback':(response) =>{
            },
            'expired-callback':()=>{

            }
        })
    },[auth]);
    const numberKey = (e) =>{
        const key = e.key;
        const regex = /^\d{1}$/;

        if (regex.test(key) || key === "Backspace") {
            setPhoneNumber(e.target.value);
        } else {
            e.preventDefault(); 
        }
    }

    function formatPhoneNumber(phoneNumber) {
        const formattedNumber = phoneNumber.replace(/\D/g, '');
        if (formattedNumber.startsWith('0')) {
          return formattedNumber.substring(1);
        }
        return `+91${formattedNumber}`;
    }
    const handleSubmit = async (e:React.SyntheticEvent) =>{
        setIsLoading(true);
        setErrorMessage('');
        setInfoMessage('');
        e.preventDefault();
        if(currentState === 'Login')
            {
                if(phoneNumber === '')
                    return
                fP = formatPhoneNumber(phoneNumber);
                const response = await axios.post(`${url}/api/user/verify`,{data:{phone:fP,formType: e.target.formType.value}});
                console.log(response);
                if(response.data.success)
                {
                    try{
                        const confirmation = await signInWithPhoneNumber(auth,fP, window.RecaptchaVerifier);
                        setConfirmationResult(confirmation);
                        console.log(confirmation)
                        setInfoMessage('OTP has been sent to your mobile!');
                        setOtpSent(true);
                    }
                    catch(error)
                    {
                        switch (error.code) {
                            case 'auth/too-many-requests':
                              setErrorMessage('Too many attempts! Try again later.');
                              break;
                            default:
                              console.error('Unknown error:', error);
                              break;
                        }
                        setIsLoading(false);
                    }
                }
                else{
                    setCurrentState('Register')
                    setIsLoading(false);
                }
            }
        else if(currentState==='Register'){
            if(phoneNumber===''||name===''||email==='')
                return
            fP = formatPhoneNumber(phoneNumber);
            const checkUser = await axios.post(`${url}/api/user/verify`,{data:{phone:fP,email:email}})
            if(checkUser.data.success){
                try{
                    if(phoneNumber==='')
                    {
                        return 
                    }
                    const confirmation = await signInWithPhoneNumber(auth,fP, window.RecaptchaVerifier);
                    setConfirmationResult(confirmation);
                    console.log(confirmation)
                    setInfoMessage('OTP has been sent to your mobile!');
                    setOtpSent(true);
                }
                catch(error)
                {
                    switch (error.code) {
                        case 'auth/too-many-requests':
                          setErrorMessage('Too many attempts! Try again later.');
                          break;
                        default:
                          console.error('Unknown error:', error);
                          break;
                    }
                    setIsLoading(false);
                }
            }
            else
            {
                setErrorMessage(checkUser.data.message);
                setIsLoading(false);
            }
        }
        else{
            console.log("Internal Error!");
            setErrorMessage('Internal Error! Please try again later.');
            setIsLoading(false);
        }
    }
    const handleOTPSubmit =async()=>{
        console.log('here');
        try{
            setIsLoading(true);
            const res = await confirmationResult.confirm(otp);
            if(res)
            {
                fP=formatPhoneNumber(phoneNumber);
                if(currentState==='Login')
                {
                    const response = await axios.post(`${url}/api/user/login`,{data:{phone:Number(fP)}});
                    if(response.data.success)
                    {
                        setToken(response.data.token);
                        localStorage.setItem('token',response.data.token);
                    }
                    else
                        setErrorMessage('Oops! An error has occurred, Please try again later.');    
                    toggleDrawer(false);
                    setIsLoading(false);
                }
                else{
                    const response = await axios.post(`${url}/api/user/register`,{data:{phone:Number(fP),name:name,email:email}});
                    if(response.data.success)
                    {
                        setInfoMessage('Welcome to Foodie! You will be redirected to your dashboard');
                        setIsLoading(false);
                        isDrawerOpen(false);
                        resetAll();
                    }
                    else
                        setErrorMessage('Oops! An error has occurred, Please try again later.');
                        setIsLoading(false);
                }
            }
        }
        catch(err){
            switch (err.code) {
                case 'auth/invalid-verification-code':
                  setErrorMessage('Invalid OTP. Please enter the correct code.');
                  break;
                case 'auth/invalid-verification-id':
                  setErrorMessage('Invalid verification ID. Please try requesting a new OTP.');
                  break;
                case 'auth/verification-failed':
                  setErrorMessage('OTP verification failed. Please check your network connection and try again.');
                  break;
                default:
                  console.error('Unknown error:', errorMessage);
                  break;
        }
        setIsLoading(false);
    }
    }
    function resetAll()
    {
        setOtp('');
        setOtpSent(false);
        setPhoneNumber('');
        fP=''
        setName('');
        setEmail('');
        setErrorMessage('');
        setInfoMessage('');
        setIsLoading(false);
    }
    return(
        <>
            <div id="recaptcha-container"></div>
            <Drawer anchor='right' open={isDrawerOpen} onClose={toggleDrawer}>
                <div className='login-signup-wrapper'>
                <Close onClick={toggleDrawer} sx={{marginBottom: '12px',cursor: 'pointer'}}/>
                    <div className="login-signup-header">
                        {
                            currentState==='Login'
                            ?
                            <>
                                <h3>Login</h3>
                                <p>or <span onClick={()=>{setCurrentState('Register');resetAll()}}>create an account</span></p>
                            </>
                            :
                            <>
                                <h3>Sign Up</h3>
                                <p>or <span onClick={()=>{setCurrentState('Login');resetAll()}}>login to your account</span></p>
                            </>
                        }
                    </div>
                    <div className="login-signup-form">
                        <form method='POST' onSubmit={handleSubmit}>
                        {currentState==='Login'?
                        <>
                            <input type="hidden" value="login" name="formType" />
                            <input type="tel" className='form-fields' placeholder='Phone Number' disabled={isLoading} name="phone" id="phone" value={phoneNumber} onKeyDown={numberKey} maxLength='10' onChange={(e)=>{setPhoneNumber(e.target.value)}} required aria-required/>
                            {otpSent===true?
                                <OtpInput value={otp} onChange={setOtp} inputType='text' numInputs={6} containerStyle={'input-wrapper'} renderSeparator={<span>-</span>} renderInput={(props) => <input {...props}/>}></OtpInput>
                                :null
                            }
                        </>
                        :
                        <>
                            <input type="tel" className='form-fields' onKeyDown={numberKey} maxLength={10} disabled={isLoading} value={phoneNumber}  onChange={(e)=>{setPhoneNumber(e.target.value)}} required aria-required placeholder='Phone Number' name="phone" id="phone"/>
                            <input type='text' className='form-fields' disabled={isLoading} value={name} onChange={(e)=>setName(e.target.value)} required placeholder='Full Name' name='name' id='name'/>
                            <input type='email' className='form-fields' disabled={isLoading} value={email} onChange={(e)=>setEmail(e.target.value)}aria-required placeholder='Email' name='email' id='email'/>
                            {otpSent===true?
                                <OtpInput value={otp} onChange={setOtp} inputType='text' numInputs={6} containerStyle={'input-wrapper'} renderSeparator={<span>-</span>} renderInput={(props) => <input {...props} />}></OtpInput>
                                :null
                            }
                        </>
                        }
                        {
                            otpSent===true?
                            <button type='button' onClick={handleOTPSubmit}>Verify OTP</button>:
                            <button type='submit' disabled={isLoading} >{isLoading && <div className="spinner"></div>}{currentState==='Register'?'Create Account':'Login'}</button>
                        }
                        </form>
                    </div>
                    {infoMessage!==''?
                    <div id='info-notify'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                        </svg>
                        {infoMessage}
                    </div>
                    :null}
                    {
                        errorMessage !== ''
                        ?
                            <div id='error-notify'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                                </svg>
                                {errorMessage}
                            </div>
                        :
                        null
                    }
                    <div className="login-condition">
                        <p>By continuing, I accept the Terms of use & Privacy Policy</p>
                    </div>
                </div>   
            </Drawer>
            
        </>
    )
}
export default LoginSignup;