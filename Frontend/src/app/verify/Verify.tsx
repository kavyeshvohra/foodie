"use client"
import {useRouter} from 'next/navigation'
import './Verify.css'
import {useEffect,useContext} from 'react'
import axios from 'axios'
import {useSearchParams} from 'next/navigation'
import { StoreContext } from '@/context/StoreContext'
const Verify = () => {
    const {token} = useContext(StoreContext)
    const searchParams = useSearchParams()
    const success = searchParams.get(`success`);
    const orderId = searchParams.get(`orderId`);
    const router = useRouter();

    const verifyPayment = async () =>{
        console.log(token);
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/order/verify-order`, {success:success,orderId:orderId},{headers:{Authorization:` ${token}`}})
        if(response.data.success){
            router.push('/orders');
        }
        else{
            router.push('/');
        }
    }
    useEffect(()=>{
        if(token)
            verifyPayment();
    },[token])
    return (
    <>
        <div className="verify">
            <div className="spinner"></div>
            <div className="verify__container">
                <h1 className="verify__title">{success ? "Success" : "Failed"}</h1>
                <p className="verify__message">
                    {success ? `Your order has been placed! Your order number is ${orderId}` : "Your order has failed. Please try again."}
                </p>
            </div>
        </div>
        
        </>
    )
}
export default Verify;