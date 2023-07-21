import mongoose from "mongoose";

const CartItemSchema = new mongoose.Schema({
    book_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'Book',
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        default: 1,
        min: 1
    },
}, {timestamps: true});

const CartItem = mongoose.model('CartItem', CartItemSchema);

export {CartItem};