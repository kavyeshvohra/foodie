import React, { useEffect,useState } from 'react'
import './Orders.css'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import {assets} from '../../assets/assets.js'
const Orders = ({url}) => {
  const [orders, setOrders] = useState([]);
  
  const fetchAllOrders = async () =>{
    const res = await axios.get(url+"/api/order/list")
    if(res.data.success)
    {
      setOrders(res.data.data);
    }
    else
      toast.error('Error, Fetching Orders!')
  }
  const handleSelect = async (e,orderId)=>{
    const res = await axios.post(url+"/api/order/status",{
      orderId,
      status:e.target.value
    })
    if(res.data.success)
      {
        fetchAllOrders();
      }
  }
  useEffect(()=>{
    fetchAllOrders();
  },[])
  return (
    <div>
      <ToastContainer/>
      <div className="order add">
        <h3>Orders</h3>
        <div className="order-list">
          {orders.map((order,index)=>(
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />
              <div>
                <p>Items ordered:</p>
                <p className="order-item-food">
                  {order.items.map((item,index)=>{
                    if(index===order.items.length - 1)
                      return item.name + " x " + item.quantity
                    else{
                      return item.name + " x " + item.quantity + ", "
                    }
                  })
                  }
                </p>
                <p className="order-item-name">
                  {
                    order.deliveryAddress.firstName+" "+order.deliveryAddress.lastName
                  }
                </p>
                <div className="order-item-address">
                  <p>{order.deliveryAddress.street+","}</p>
                  <p>{order.deliveryAddress.city +","+order.deliveryAddress.state+", "+order.deliveryAddress.country+", "+order.deliveryAddress.pincode}</p>
                </div>
                <p className='order-item-phone'>{order.deliveryAddress.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>₹{order.totalAmount}</p>
              <select onChange={(e)=>handleSelect(e, order._id)} value={order.status}>
                <option value="Order Processing">Order Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Orders