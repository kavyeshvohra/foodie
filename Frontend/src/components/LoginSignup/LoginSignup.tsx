'use client'
import Drawer from '@mui/material/Drawer'
import './LoginSignup.css'
import { Close, LineAxisOutlined } from '@mui/icons-material'
import { useState, useEffect } from 'react'
import OtpInput from 'react-otp-input'
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import app from '../../api/_Firebase/clientApp'
import { useRouter } from "next/navigation"
import axios from 'axios'

const LoginSignup = ({isDrawerOpen, toggleDrawer}) =>{
    const[currentState, setCurrentState] = useState('Login');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [userVerification, setUserVerification] = useState(false);
    const [otpSent, setOtpSent] = useState(false)
    const url = process.env.NEXT_PUBLIC_API_URL
    const auth = getAuth(app);
    const router = useRouter();
    let fP = '';
    const[errorMessage,setErrorMessage] = useState('');
    const[infoMessage,setInfoMessage]=useState('');
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
        setErrorMessage('');
        setInfoMessage('');
        e.preventDefault();
        if(currentState === 'Login')
            {
                if(phoneNumber === '')
                    return
                fP = formatPhoneNumber(phoneNumber);
                const response = await axios.post(`${url}/api/user/login`,{data:{phone:fP}});
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
                        console.error(error);
                    }
                }
                else{
                    setCurrentState('Register')
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
                }
                if(userVerification)
                {
                    const response = await axios.post(`${url}/api/user/register`,{data:{phone:fP,name:name,email:email}});
                    if(response.data.success)
                    {
                        setInfoMessage('Welcome to Foodie! You will be redirected to your dashboard');
                        resetAll();
                    }
                    else
                        setErrorMessage('Oops! An error has occurred, Please try again later.');
                }
            }
            else
            {
                setErrorMessage(checkUser.data.message);
            }
        }
        else{
            console.log("Internal Error!");
        }
    }
    // const handleSendOtp = async () =>{
        
    // }
    const handleOTPSubmit = async()=>{
        try{
            console.log('hello!')
            if(currentState==='login')
            {
                alert(1);
                await confirmationResult.confirm(otp);
                toggleDrawer(false);
                router.push('dashboard');    
            }
            else if(currentState=='register'){
                const res = await confirmationResult.confirm(otp)
                if(res)
                    setUserVerification(true)
                else {
                    setErrorMessage('Invalid OTP. Please try again.');
                }
            }
        }
        catch(error){
            console.error(error);
        }
    }
    const handleOTPSubmit1 =async()=>{
        console.log('here');
        try{
            const res = await confirmationResult.confirm(otp);
            if(res)
            {
                console.log('hello!')
                if(currentState==='login')
                {
                    alert(1);
                    toggleDrawer(false);
                    router.push('dashboard');    
                }
                else{
                    alert(2);
                    setUserVerification(true);
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
        setUserVerification(false);
        setErrorMessage('');
        setInfoMessage('');
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
                        <form method='POST' onSubmit={handleSubmit} encType='multipart/form-data'>
                        {currentState==='Login'?
                        <>
                            <input type="tel" className='form-fields' placeholder='Phone Number' disabled={otpSent===true?true:false} name="phone" id="phone" value={phoneNumber} onKeyDown={numberKey} maxLength='10' onChange={(e)=>{setPhoneNumber(e.target.value)}} required aria-required/>
                            {otpSent===true?
                                <OtpInput value={otp} onChange={setOtp} inputType='text' numInputs={6} containerStyle={'input-wrapper'} renderSeparator={<span>-</span>} renderInput={(props) => <input {...props} />}></OtpInput>
                                :null
                            }
                        </>
                        :
                        <>
                            <input type="tel" className='form-fields' onKeyDown={numberKey} maxLength='10' disabled={otpSent===true?true:false} value={phoneNumber}  onChange={(e)=>{setPhoneNumber(e.target.value)}} required aria-required placeholder='Phone Number' name="phone" id="phone"/>
                            <input type='text' className='form-fields' value={name} onChange={(e)=>setName(e.target.value)} required placeholder='Full Name' name='name' id='name'/>
                            <input type='email' className='form-fields' value={email} onChange={(e)=>setEmail(e.target.value)}aria-required placeholder='Email' name='email' id='email'/>
                            {otpSent===true?
                                <OtpInput value={otp} onChange={setOtp} inputType='text' numInputs={6} containerStyle={'input-wrapper'} renderSeparator={<span>-</span>} renderInput={(props) => <input {...props} />}></OtpInput>
                                :null
                            }
                        </>
                        }
                        {
                            otpSent===true?
                            <button type='button' onClick={handleOTPSubmit1}>Verify OTP</button>:
                            <button type='submit'>{currentState==='Register'?'Create Account':'Login'}</button>
                        }
                        </form>
                    </div>
                    {otpSent===true?
                    <>
                        <button type='button' id='resend-otp' onClick={()=>handleresendOtp}>Resend OTP</button>
                        <div id='otp-sent-notify'>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                            </svg>
                            {infoMessage}
                        </div>
                    </>
                    :
                    null
                    }
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