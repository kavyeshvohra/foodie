"use client"
import './Header.css'
import Image from 'next/image'
import {assets} from '../../assets'
import { useState } from 'react'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
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
                    <SearchIcon fontSize='large' sx={{color: '#49557e'}}/>
                    <div className="navbar-search-icon">
                        <ShoppingBagIcon fontSize='large' sx={{color: '#49557e'}}/>
                        <div className="dot"></div>
                    </div>
                    <button>Sign In</button>
                </div>
            </div>
        </>
    )
}