import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req,res)=>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name: req.body.name,
        description:req.body.description,
        price:req.body.price,
        cat:req.body.cat,
        img:image_filename
    })
    try {
        await food.save();
        res.json({success:true,message:"Food Added"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//display food list

const listFood = async(req,res) =>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Could not fetch!"});
    }
}

//Remove Food Item

const removeFood = async (req,res) =>{
    try {
        const foodItem = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${foodItem.img}`,()=>{});
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Item Deleted!"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


export {addFood, listFood, removeFood}