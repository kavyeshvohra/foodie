import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import validator from 'validator'
import 'dotenv/config'

//Login User
const loginUser = async (req,res)=> {
    const {phone} = req.body.data;
    const user = await userModel.findOne({phone})
    console.log(user);
    if(!user){
        return res.json({success:false, message:"User not registered!"});
    }
    return res.json({success:true});
}
const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
//Register User
const checkUser = async(req,res)=>{
    try {
        const {phone,email} = req.body.data;
        const userEmail = await userModel.findOne({email});
        const userPhone = await userModel.findOne({phone});
        if(userEmail)
        {
            return res.json({success:false, message: "User already registered with same email!"})
        }
        else if(userPhone)
        {
                return res.json({success:false, message:"User already registered with same mobile number!"});
        }
        return res.json({success:true});
    } catch (error) {
        res.json({success:false, message:'Error Occured!'})
    }
}
const registerUser = async(req,res)=>{
    try{
        const {phone,name,email} = req.body.data;
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Email not valid!"});
        }
        const newUser = new userModel({
            phone:phone,
            name:name,
            email:email
        })
        const saveUser = await newUser.save()
        const token = createToken(saveUser._id);
        res.json({success:true,token});

    }
    catch(err){
        console.log(err);
        res.json({success:false,message:'Error!'});
    }

}
export{loginUser,registerUser,checkUser}