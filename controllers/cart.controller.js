import {CartService} from "../services/cart.service.mjs";

class CartController {

    constructor() {
        this.cartService = new CartService();
    }

    async findOne(request, response) {
        const {user_id} = request.user;
        const cart = await this.cartService.findOne(user_id);
        return response.status(200).json(cart);
    }


    async addItem(request, response) {
        const {book_id} = request.body;
        const {user_id} = request.user;
        const db_cart = await this.cartService.addToCart(user_id, {book_id});
        return response.status(201).json(db_cart);
    }

    delete() {
    }

    truncate() {

    }
}

export {CartController};