import {Cart} from "../models/cart.model.mjs";
import {CartItem} from "../models/cart-item.model.mjs";

class CartService {

    async findOne(user_id) {
        return Cart.findOne({user_id: user_id})
            .populate({path: 'items.book_id', options: {strictPopulate: false}})
            .lean()
            .exec();
    }

    async create(user_id) {
        await Cart.create({user_id: user_id});
    }

    async addToCart(user_id, book) {
        const {book_id, quantity} = book;
        const cart = await Cart.findOne({user_id: user_id});

        const existingItem = cart.items.find(item => {
            return item.book_id.toString() === book_id;
        });

        if (existingItem) {
            if (isNaN(quantity)) {
                existingItem.quantity += 1;
            } else {
                existingItem.quantity += parseInt(quantity);
            }
        } else {
            if (isNaN(quantity)) {
                book.quantity = 1;
            } else {
                book.quantity = parseInt(quantity);
            }
            cart.items.push(book);
        }

        await cart.save();
        return cart;

    }

    async deleteFromCart(user_id, book_id) {
        const cart = await Cart.findOne({user_id: user_id});
        const itemIndex = cart.items.findIndex(item => item.book_id.toString() === book_id);

        if (itemIndex !== -1) {
            cart.items.splice(itemIndex, 1);
            await cart.save();
            return cart;
        } else {
            return false;
        }
    }

    async deleteAllBooks(user_id, id) {
        const cart = await Cart.findOne({user_id: user_id});
        if (cart._id.toString() !== id) {
            return false;
        }
        console.log(cart)
        cart.items = [];
        cart.save();
        return cart;
    }

}

export {CartService};