import mongoose from "mongoose"

const orderSchema = new mongoose.Schema({
    totalAmount:{
        type:Number,
    }
},{timestamps:true});

const Order = mongoose.model("Order",orderSchema);

export default Order;