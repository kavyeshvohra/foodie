import express from 'express';
import auth from '../middleware/auth.js';
import { placeOrder,verifyOrder,userOrders } from '../controllers/orderController.js';

const orderRouter = express.Router();

orderRouter.post('/place-order', auth, placeOrder);
orderRouter.post('/verify-order', auth, verifyOrder);
orderRouter.get('/get-orders', auth, userOrders);
export default orderRouter;