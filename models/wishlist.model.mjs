import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true,
        unique: true
    },
    books: {
        type: [mongoose.Schema.Types.ObjectId]
    }
}, {timestamps: true});

const Wishlist = mongoose.model('Wishlist', WishlistSchema);

export {Wishlist};