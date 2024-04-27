import { StoreContext } from "@/context/StoreContext";
import Image from "next/image";
import { useContext } from "react";
import './cart.css'
const Cart = () =>{
    
    const {cartItems, food_list, removeFromCart} = useContext(StoreContext);

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
                                    <p>₹{item.price}</p>
                                    <p>{cartItems[item._id]}</p>
                                    <p>{item.price*cartItems[item._id]}</p>
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
                                <p>{0}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Cart;