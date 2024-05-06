import foodModel from "../models/foodModel.js";
import fs from 'fs'


//add food item

const addFood = async (req,res)=>{
    if(!req.files){
        return res.json({success:false, message:"No images uploaded!"});
    }
    const imgUrls = []; //Array for images
    try{
        // Assuming req.files.img is an array of images
        req.files.forEach(file=>{
            let image_filename = `${file.filename}`;
            imgUrls.push(image_filename);
        })

        const food = new foodModel({
            name: req.body.name,
            description:req.body.description,
            price:req.body.price,
            cat:req.body.cat,
            img:imgUrls,
        });
        await food.save();
        res.json({success:true,message:"Food Item Added"})
    }
    catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:"Error", error: error.message});
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

        if(Array.isArray(foodItem.img)){
            for(const image of foodItem.img){
                fs.unlink(`uploads/${image}`,(err)=>{
                    if(err){
                        console.error(`Error deleting image: ${image}`, err);
                    }
                });
            }
        }
        else{
            fs.unlink(`uploads/${foodItem.img}`,(err)=>{
                if(err){
                    console.error(`Error deleting image: ${foodItem.img}`,err);
                }
            })
        }
        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Food Item Deleted!"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}


export {addFood, listFood, removeFood}