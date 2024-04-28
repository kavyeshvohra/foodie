"use client"
import { useContext } from 'react';
import './PlaceOrder'
import './PlaceOrder.css'
import '../../components/Cart/Cart.css'
import { StoreContext } from '@/context/StoreContext';
const PlaceOrder = () =>{
    const {returnTotalAmount, returnDeliveryAmt} = useContext(StoreContext)
    return(
        <form className='place-order'>
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input type="text" placeholder='First Name'/>
                    <input type="text" placeholder='Last Name' />
                </div>
                <input type="email" name="email" id="email"  placeholder='Email Address'/>
                <input type="text" placeholder='House / Street / Landmark' />
                <div className="multi-fields">
                    <input type="text" name="city" placeholder='City' />
                    <input type="text" name="state" placeholder='State' />
                </div>
                <div className="multi-fields">
                    <input type="text" name="pincode" placeholder='Pin Code' />
                    <input type="text" name="country" placeholder='Country' />
                </div>
                <input type="text" name="phone" id="phone" placeholder='Phone' />
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
                            <button onClick={()=>router.push('/place-order')}>Proceed To Payment</button>
                        </div>
            </div>
        </form>
    );
}

export default PlaceOrder