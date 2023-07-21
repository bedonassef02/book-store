import mongoose from "mongoose";
import {CartItem} from "./cart-item.model.mjs";

const CartSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
        unique: true
    },
    items: {
        type: [CartItem.schema]
    }
}, {timestamps: true});

const Cart = mongoose.model('Cart', CartSchema);

export {Cart};