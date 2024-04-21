'use client'
import { useState, useEffect } from "react"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import {app} from './config'
import { useRouter } from "next/router"

const LoginVerifier = () =>{
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null)
    const [otpSent, setOtpSent] = useState(false)
    
    const auth = getAuth(app);
    const router = useRouter();

    useEffect(()=>{
        window.RecaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container',{
            'size':'normal',
            'callback':(response) =>{

            },
            'expired-callback':()=>{

            }
        })
    },[auth]);
    
    const handlePhoneNumberChange = (e) =>{
        setPhoneNumber(e.target.value);
    }
    const handleOTPChange = (e)=>{
        setOtp(e.target.value);
    }

    const handleSendOtp = async () =>{
        try{
            const formattedPhoneNumber = `+${phoneNumber.replace(/\D/g, '')}`;
            const confirmation = await signInWithPhoneNumber
        }
    }
}