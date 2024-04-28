import mongoose from "mongoose";

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://team:QNKjRF7Rugg8Q2qL@cluster0.qwkplj0.mongodb.net/food-del?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log('DB Connected'));
}