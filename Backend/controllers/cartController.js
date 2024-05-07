import userModel from "../models/userModel.js";

//add to cart
const addToCart = async (req, res) => {
    try {
        const { user } = req.body;
        const userData = await userModel.findById(user);
        const cartData = await userData.cartData;
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(user, { cartData }); 
        res.json({ success: true, message: 'Added to Cart!' });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: 'Error! Connection Error!' });
    }
}
//remove from cart
const removeFromCart = async (req, res) => {
    try{
        const { user } = req.body;
        const userData = await userModel.findById(user);
        const cartData = await userData.cartData;
        if (cartData[req.body.itemId]>0) {
            cartData[req.body.itemId] -= 1;
        } else {
            res.json({ success: false, message: 'Item not in Cart!' });
        }
        await userModel.findByIdAndUpdate(user, { cartData }); 
        res.json({ success: true, message: 'Removed From Cart!' });
    } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Error! Connection Error!' });
}
}

//Fetch Cart
const fetchCart = async (req, res) => {
    try{
        const { user } = req.body;
        const userData = await userModel.findById(user);
        const cartData = await userData.cartData;
        if (cartData) {
            res.json({ success: true, cartData });
        } else {
            res.json({ success: false, message: 'No Items Found!' });
        }
    } catch (err) {
    console.log(err);
    res.json({ success: false, message: 'Error! Connection Error!' });
}
}
export { addToCart, removeFromCart, fetchCart };