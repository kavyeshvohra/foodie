"use client"
import { createContext, useEffect, useState } from "react";
import {food_list} from "../assets"
export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
    const [cartItems, setCartItems] = useState({});
    const addToCart = (itemId) =>{
        setCartItems((prevItems) => ({
            ...prevItems,
            [itemId]: Math.min(prevItems[itemId] + 1 || 1, 10),
          }));
        // if(!cartItems[itemId]){
        //     setCartItems((prev)=>({...prev,[itemId]:1}))
        // }
        // else{
        //     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        // }
    }
    const removeFromCart = (itemId) => {
            // Get a copy of the current cartItems state
    const updatedCartItems = { ...cartItems };

    // Decrement the quantity of the item by 1
    updatedCartItems[itemId] -= 1;

    // If the quantity becomes zero, remove the item entirely
    if (updatedCartItems[itemId] === 0) {
        delete updatedCartItems[itemId];
    }

    // Update the cartItems state with the modified object
    setCartItems(updatedCartItems);
        // setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }

    const returnTotalAmount = () =>{
        let totalAmt = 0;
        for(const item in cartItems)
        {
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product)=>product._id === item)
                totalAmt += itemInfo.price * cartItems[item];
            }
        }
        return totalAmt;
    }

    const returnDeliveryAmt = () =>{
        let deliveryRate = 0;
        if(Object.keys(cartItems).length > 0){
            deliveryRate = 200;
        }
        return deliveryRate;

    }

    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        returnTotalAmount,
        returnDeliveryAmt
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider