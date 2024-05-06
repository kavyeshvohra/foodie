import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios';
import { toast } from 'react-toastify';
const List = ({url}) => {
  const [foodList, setFoodList] = useState([]);
  const fetchList = async()=>{
    const response = await axios.get(`${url}/api/food/list`);
    if(response.data.success)
    {
      setFoodList(response.data.data);
    }
    else{
      toast.error('Error getting food items!')
    }
  }

  useEffect(()=>{
    fetchList();
  },[])
  const removeFood = async(i)=>{
    const response = await axios.delete(`${url}/api/food/remove`,{data:{id:i}});
    await fetchList();
  }
  return (
    <>
      <div className="list add flex-col">
        <p>Food Items</p>
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {
          foodList.map((item,index)=>{
            return(
              <div key={index} className="list-table-format">
                <img src={`${url}/images/`+item.img[0]} alt=""/>
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>₹{item.price}</p>
                <p onClick={()=>removeFood(item._id)}>X</p>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default List