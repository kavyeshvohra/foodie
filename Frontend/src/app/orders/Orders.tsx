'use client'
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { StoreContext } from "@/context/StoreContext";
import { assets } from "@/assets";
import Image from 'next/image';
import axios from 'axios';
const Orders = () =>
{
    const {token} = useContext(StoreContext)
    const [data, setData] = useState([]);
    const Router = useRouter();
    const fetchOrders = async () =>{
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`+"/api/order/get-orders",{headers:{"Authorization":`${token}`}});
        if(response.data.success)
            setData(response.data.orders);
    }
    useEffect(() => {
        if(token)
            fetchOrders();
    },[token]);
    return(
        <>
            <div className="my-orders">
                <h1>My Orders</h1>
                <div className="orders">
                    {
                        data.length > 0
                        ?
                            data.map((order, index) => {
                            return(
                                <div key={index} className="orders-order">
                                    <Image src={assets.parcel_icon} alt=""/>
                                    <p>{order.items.map((item,index)=>{
                                        if(index === order.items.length - 1){
                                            return item.name+" x"+item.quantity;
                                        }   
                                        else{
                                            return item.name+" x"+item.quantity+", ";
                                        }
                                        })
                                    } 
                                    </p>
                                    <p>₹{order.totalAmount}</p>
                                    <p>Items:{order.items.length}</p>
                                    <p><span>&#x25cf;</span>&nbsp;<b>{order.status}</b></p>
                                    <button>Track Order</button>
                                </div>
                            )
                            })
                        :
                        <div className="orders-info-message">
                            <Image src={assets.orderFood} className="action-img"/>
                            <h2>No New Orders :)</h2>
                            <p>Go ahead, order delicious food!</p>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}
export default Orders;