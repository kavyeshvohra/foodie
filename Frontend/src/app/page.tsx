"use client"
import Link from "next/link";
import { useState } from "react";
import './index.css'
import ExploreMenu from "@/components/ExploreMenu/ExploreMenu";
import { FoodDisplay } from "@/components/FoodDisplay/FoodDisplay";
export default function Home()
{   const [category, setCategory] = useState<string>("All");
    return <>
        <div className="banner">
            <div className="banner-contents">
                <h1>Order your favourite food here!</h1>
                <p>Choose from a diverse menu featuring mouth watering dishes crafted by your city's best restaurants!</p>
                <button>View Menu</button>
            </div>
        </div>
        <ExploreMenu category={category} setCategory={setCategory}/>
        <FoodDisplay category={category}/>
    </>    
}