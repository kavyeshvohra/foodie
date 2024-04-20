import Image from 'next/image'
import './FoodItem.css'
import { assets } from '@/assets'
import { Rating } from '@mui/material'
import { useContext } from 'react'
import { StoreContext } from '@/context/StoreContext'
export const FoodItem = ({id,name,price,description,ratings,image}) =>{
    const {cartItems, addToCart, removeFromCart}     = useContext(StoreContext);
    return(
        <>
            <div className="food-item">
                <div className="food-item-img-container">
                    <Image className='food-item-image' src={image} alt=""/>
                    {
                        !cartItems[id]?<Image className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=""/>:
                        <div className="food-item-counter">
                            <Image onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=""/>
                            <p>{cartItems[id]}</p>
                            <Image onClick={()=>addToCart(id)} src={assets.add_icon_green} alt=""/>
                        </div>
                    }
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <Rating name="read-only" value={ratings} precision={0.5} size="small" readOnly/>
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item-price">₹{price}</p>

                </div>
            </div>
        </>
    )
}