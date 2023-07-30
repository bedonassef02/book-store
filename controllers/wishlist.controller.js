import {WishlistService} from "../services/wishlist.service.mjs";

class WishlistController {

    constructor() {
        this.withlistService = new WishlistService();
    }

    findOne(request, response) {
        const {user_id} = request.user;
        const wishlist = this.withlistService.findOne(user_id);
        response.status(200).json(wishlist);
    }

    async toggleBook(request, response) {
        const {user_id} = request.user;
        const {book_id} = request.params;
        const wishlist = await this.withlistService.toggleBook(user_id, book_id);
        response.status(200).json(wishlist);
    }

}

export {WishlistController};