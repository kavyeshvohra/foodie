"use client"
import { useContext, useEffect, useState } from 'react';
import './PlaceOrder'
import './PlaceOrder.css'
import '../../components/Cart/Cart.css'
import { StoreContext } from '@/context/StoreContext';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const PlaceOrder = () =>{
    const {returnTotalAmount, returnDeliveryAmt,token,food_list,cartItems} = useContext(StoreContext)
    
    const router = useRouter();
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        state: '',
        pincode: '',
        country: '',
        phone: ''
    })

    const placeOrder = async (e) =>{
        e.preventDefault()
        let orderItems=[]
        food_list.map((item)=>{
            if(cartItems[item._id]>0){
                let itemInfo = item;
                itemInfo["quantity"]=cartItems[item._id]
                orderItems.push(itemInfo);
            }
        })
        console.log(orderItems)
        let orderData = {
            address:data,
            items:orderItems,
            totalAmount:returnTotalAmount()+returnDeliveryAmt(),
        }
        let response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`+"/api/order/place-order",orderData,{headers:{"Authorization":` ${token}`}})
        if(response.data.success){
            const {session_url} = response.data;
            window.location.replace(session_url);
        }
        else{
            alert("Order Failed! Please try again.")
        }
    }
    const onChangeHandler = (e) => {
        const name = e.target.name
        const value = e.target.value
        setData(data=>({
            ...data,
            [name]: value
        }))
    }
    useEffect(()=>{
        if(returnTotalAmount()===0)
            {
                router.push('/cart');
            }
        else if(!token)
        {
            router.push('/cart');
        }
    },[token])
    return(
        <form className='place-order' onSubmit={placeOrder}>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" required aria-required name="firstName" onChange={onChangeHandler} value={data.firstName} placeholder='First Name'/>
                    <input type="text" required aria-required name="lastName" onChange={onChangeHandler} value={data.lastName} placeholder='Last Name' />
                </div>
                <input type="email" required aria-required onChange={onChangeHandler} value={data.email} name="email" id="email"  placeholder='Email Address'/>
                <input type="text" required aria-required name="address" onChange={onChangeHandler} value={data.address} placeholder='House / Street / Landmark' />
                <div className="multi-fields">
                    <input type="text" required aria-required onChange={onChangeHandler} value={data.city} name="city" placeholder='City' />
                    <input type="text" required aria-required onChange={onChangeHandler} value={data.state} name="state" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input type="text" required aria-required onChange={onChangeHandler} value={data.pincode} name="pincode" placeholder='Pin Code' />
                    <input type="text" required aria-required onChange={onChangeHandler} value={data.country} name="country" placeholder='Country' />
                </div>
                <input type="tel" required aria-required onChange={onChangeHandler} value={data.phone} name="phone" id="phone" placeholder='Phone' />
            </div>
            <div className="place-order-right">
            <div className="cart-total">
                        <h2>Cart Totals</h2>
                        <div>
                            <div className="cart-total-details">
                                <p>Subtotal</p>
                                <p>₹ {returnTotalAmount()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <p>Delivery Fee</p>
                                <p>₹ {returnDeliveryAmt()}</p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>₹ {returnTotalAmount()+returnDeliveryAmt()}</b>
                            </div>
                        </div>
                            <button type='submit'>Proceed To Payment</button>
                        </div>
            </div>
        </form>
    );
}

export default PlaceOrder