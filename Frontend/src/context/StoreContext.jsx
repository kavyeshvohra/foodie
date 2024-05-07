"use client"
import { createContext, useEffect, useState } from "react";
// import {food_list} from "../assets"
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = (props) =>{
    const [cartItems, setCartItems] = useState({});
    const [token, setToken] = useState(null);
    const [food_list, setFoodList] = useState([]);
    const [isDrawerOpen,setIsDrawerOpen] = useState(false);
    const addToCart = async (itemId) =>{
        setCartItems((prevItems) => ({
            ...prevItems,
            [itemId]: Math.min(prevItems[itemId] + 1 || 1, 10),
          }));
          if(token){
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`+"/api/cart/add", {itemId:itemId},{headers:{Authorization:`${token}`}})
          }
        // if(!cartItems[itemId]){
        //     setCartItems((prev)=>({...prev,[itemId]:1}))
        // }
        // else{
        //     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
        // }
    }
    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }
    const fetchFoodList = async() =>{
        const res = await axios.get('http://localhost:4000/api/food/list');
        setFoodList(res.data.data);
    }
    useEffect(()=>{
        async function fetchData(){
            await fetchFoodList();
            if(localStorage.getItem('token')){
                setToken(localStorage.getItem('token'));
                await loadCart(localStorage.getItem('token'));
            }
        }
        fetchData();
    },[])
    const removeFromCart = async(itemId) => {
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

    if(token){
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}`+"/api/cart/remove", {itemId:itemId},{headers:{Authorization:`${token}`}})
      }
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

    const loadCart = async(token) =>{
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`+"/api/cart/get",{headers:{Authorization:`${token}`}});
        setCartItems(res.data.cartData);
    }
    const contextValue={
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        returnTotalAmount,
        returnDeliveryAmt,
        token,
        setToken,
        loadCart,
        toggleDrawer,
        isDrawerOpen
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider