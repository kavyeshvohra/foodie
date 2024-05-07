import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const frontend_url = "http://localhost:3000"
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
//Placing Order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
        userId: req.body.user,
        items: req.body.items,
        totalAmount: req.body.totalAmount,
        paymentMethod: req.body.paymentMethod,
        deliveryDate: req.body.deliveryDate,
        deliveryAddress: req.body.address.address
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.user, { cartData:{} });
    const line_items = req.body.items.map(item => {
        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                    // images: [item.image]
                },
                unit_amount: item.price*100
            },
            quantity: item.quantity
        }
    });
    line_items.push({
        price_data: {
            currency: 'inr',
            product_data: {
                name: 'Delivery Charge'
            },
            unit_amount: 200*100
        },
        quantity: 1
    });
    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode:'payment',
        success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    })

    res.json({success:true, session_url: session.url});
}
  catch (err) {
    console.log(err);
    res.json({ success: false, message: "Error! Connection Error!" });
  }
}
const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try{
        if(success=='true')
        {
            await orderModel.findByIdAndUpdate(orderId, {paymentStatus:true, status:"Order Confirmed"});
            res.json({success:true, message:"Order Confirmed!"});
        }
        else
        {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Payment Failed. Order Cancelled!"});
        }
    }

    catch(err)
    {
        console.log(err);
        res.json({success:false,message:"Error! Connection Error!"})
    }
}

//user orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.user });
        res.json({ success: true, orders });
    } catch (err) {
        console.log(err);
        res.json({ success: false, message: "Error! Connection Error!" });
    }
}

export { placeOrder, verifyOrder, userOrders };