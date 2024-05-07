"use client"
import './Header.css'
import Image from 'next/image'
import {assets} from '../../assets'
import { useContext, useState } from 'react'
import Link from 'next/link'
import SearchIcon from '@mui/icons-material/Search'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginSignup from '../LoginSignup/LoginSignup'
import { StoreContext } from '@/context/StoreContext'
import { useRouter } from 'next/navigation'
export default function Header()
{
    const [menu, setMenu] = useState("Home")
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const {returnTotalAmount,token,setToken,toggleDrawer,isDrawerOpen} = useContext(StoreContext);
    const router = useRouter();
    const handleLogOut = () => {
        setToken(null);
        localStorage.removeItem('token');
        router.push('/');
    }
    return(
        <>
            <div className="navbar">
                <Link href="/"><Image src={assets.logo} alt="" className='logo'/></Link>
                <ul className="navbar-menu">
                    <li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}><Link href='/'>Home</Link></li>
                    <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}><Link href=''>Menu</Link></li>
                    <li onClick={()=>setMenu("Contact-us")} className={menu==="Contact-us"?"active":""}><Link href='/contact'>Contact Us</Link></li>
                </ul>
                <div className="navbar-right">
                    <SearchIcon fontSize='large' sx={{color: '#49557e'}}/>
                    <div className="navbar-search-icon">
                        <Link href='/cart'><ShoppingBagIcon fontSize='large' sx={{color: '#49557e'}}/></Link>
                        <div className={returnTotalAmount()===0?"":"dot"}></div>
                    </div>
                    {!token
                        ?
                        <button onClick={toggleDrawer}>Sign In</button>
                        :
                        <div className="navbar-profile" onMouseEnter={()=>setIsDropdownVisible(true)} onMouseLeave={()=>setIsDropdownVisible(false)}>
                            <AccountCircleIcon  fontSize='large' sx={{color: '#49557e'}}/>
                            {isDropdownVisible 
                            ?
                            <div className="navbar-profile-dropdown">
                                <Link href='/profile' className="dropdown-item">Profile</Link>
                                <Link href='/orders' className="dropdown-item">Orders</Link>
                                <li className='dropdown-item' onClick={()=>handleLogOut()}>Logout</li>
                            </div>
                            :
                            null
                            }
                        </div>
                    }
                    <LoginSignup isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
                </div>
            </div>
        </>
    )
}