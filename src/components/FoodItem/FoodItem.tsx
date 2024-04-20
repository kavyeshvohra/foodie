import Image from 'next/image'
import './FoodItem.css'
import Ratings from '@mui/material-nextjs'
import { assets } from '@/assets'
export const FoodItem = ({id,name,price,description,image}) =>{
    return(
        <>
            <div className="food-item">
                <div className="food-item-img-container">
                    <Image className='food-item-image' src={image} alt=""/>
                </div>
                <div className="food-item-info">
                    <div className="food-item-name-rating">
                        <p>{name}</p>
                        <Image src={assets.rating_starts} alt=""/>
                    </div>
                    <p className="food-item-desc">{description}</p>
                    <p className="food-item--price">₹{price}</p>

                </div>
            </div>
        </>
    )
}