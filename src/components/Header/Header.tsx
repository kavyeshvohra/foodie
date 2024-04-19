"use client"
import './Header.css'
import Image from 'next/image'
import {assets} from '../../assets'
import { useState } from 'react'
import Link from 'next/link'
export default function Header()
{
    const [menu, setMenu] = useState("Home")
    return(
        <>
            <div className="navbar">
                <Image src={assets.logo} alt="" className='logo'/>
                <ul className="navbar-menu">
                    <li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}><Link href='/'>Home</Link></li>
                    <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}><Link href=''>Menu</Link></li>
                    <li onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}><Link href='/contact'>Contact Us</Link></li>
                </ul>
                <div className="navbar-right">
                    <Image src={assets.search_icon} alt=""/>
                    <div className="navbar-search-icon">
                        <Image src={assets.basket_icon} alt=""/>
                        <div className="dot"></div>
                    </div>
                    <button>Sign In</button>
                </div>
            </div>
        </>
    )
}