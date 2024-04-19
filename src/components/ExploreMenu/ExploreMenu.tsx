"use client"
import { menu_list } from "@/assets"
import "./ExploreMenu.css"
import Image from "next/image"
import React, { useState } from "react"
interface ExploreMenuProps {
    category: string;
    setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ExploreMenu: React.FC<ExploreMenuProps> = ({category, setCategory}) => {
    return(
    <>
        <div className="explore-menu" id="explore-menu">
            <h1>Explore Our Menu</h1>
            <p className="explore-menu-text">Choose from a diverse menu featuring a delectable array!</p>
            <div className="explore-menu-list">
                {menu_list.map((item,index)=>{
                    return(
                        <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
                            <Image className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
                            <p>{item.menu_name}</p>
                        </div>
                    )
                })}
            </div>
            <hr/>
        </div>
    </>
   ) 
};
export default ExploreMenu;