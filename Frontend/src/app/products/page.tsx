"use client"
import Link from "next/link";
import { useEffect,useContext } from "react";
import { StoreContext } from '@/context/StoreContext'

export default function ProductList()
{
    const {token} = useContext(StoreContext)
    useEffect(()=>{
        console.log(token)
    })
    return (
    <>
        <Link href='/'>Home</Link>
        <h1>Product List:</h1>
        <ul>
            <li><Link href='/products/1'>Product 1</Link></li>
            <li>Product 2</li>
            <li>Product 3</li>
        </ul>
    </>
    );
}