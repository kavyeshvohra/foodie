'use client'
import { useRouter } from "next/navigation";
export default function OrderProduct()
{
    const Router = useRouter();
    const handleClick = () =>{
        alert("Placing Order.....");
        Router.forward();
    }
    return(
        <>
            <h1>Order Product</h1>
            <button onClick={handleClick}>Place Order</button>
        </>
    )
}