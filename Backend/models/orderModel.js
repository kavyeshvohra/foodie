import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    userId: {type:String, required:true},
    items:{type:Array, required:true},
    totalAmount:{type:Number, required:true},
    status:{type:String,default:"Order Processing",required:true},
    paymentMethod:{type:String, default:"Online", required:true},
    paymentStatus:{type:String, default:false,required:true},
    orderDate:{type:Date, default:Date.now(),required:true},
    deliveryDate:{type:Date,default:''},
    deliveryAddress:{type:Object, required:true}
})

const orderModel = mongoose.models.order || mongoose.model('order',orderSchema);
export default orderModel;