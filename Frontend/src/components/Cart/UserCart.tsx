import { StoreContext } from "@/context/StoreContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import './Cart.css'
const Cart = () =>{
    
    const {cartItems, food_list, removeFromCart, returnTotalAmount, returnDeliveryAmt} = useContext(StoreContext);
    const router = useRouter();
    
    return(
        <>
            <div className="cart">
                <div className="cart-items">
                    <div className="cart-items-title">
                        <p>Items</p>
                        <p>Title</p>
                        <p>Price</p>
                        <p>Quantity</p>
                        <p>Total</p>
                        <p>Remove</p>
                    </div>
                    <br/>
                    <hr/>
                    {food_list.map((item,index)=>{
                        if(cartItems[item._id] > 0){
                            return <>
                                <div key={item._id} className="cart-items-title cart-items-item">
                                    <Image src={item.image} alt="" />
                                    <p>{item.name}</p>
                                    <p>₹ {item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>₹ {item.price*cartItems[item._id]}</p>
                                    <p onClick={()=>removeFromCart(item._id)} className="cross">x</p>
                                </div>
                                <hr/>
                            </>
                        }
                    })}
                </div>
                <div className="cart-bottom">
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
                                <p>
                                    ₹ {returnDeliveryAmt()}
                                </p>
                            </div>
                            <hr />
                            <div className="cart-total-details">
                                <b>Total</b>
                                <b>₹ {returnTotalAmount()+ returnDeliveryAmt()}</b>
                            </div>
                        </div>
                            <button onClick={()=>router.push('/place-order')}>Proceed To Checkout</button>
                    </div>
                    <div className="cart-promo-code">
                        <div>
                            <p>If you have a promo code, Enter it here</p>
                            <div className="cart-promo-code-input">
                                <input type="text" placeholder="Promo Code"/>
                            <button>Apply!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;