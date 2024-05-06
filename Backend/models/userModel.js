import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        phone:{type:Number,required:true, unique:true},
        name: {type:String,required:true},
        email:{type:String,required:true,unique:true},
        cartData:{type:Object,default:{}}
    }
,{minimize:false})

const userModel = mongoose.models.user || mongoose.model("user",userSchema);

export default userModel;