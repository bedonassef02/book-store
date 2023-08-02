import {Wishlist} from "../models/wishlist.model.mjs";

class WishlistService {
    async findOne(user_id) {
        return Wishlist.findOne({user_id: user_id});
    }

    async toggleBook(user_id, book_id) {
        let wishlist = await this.findOne(user_id);
        if (!wishlist) {
            wishlist = await this.#create(user_id);
            wishlist.books = [book_id];
            await wishlist.save();
            return wishlist;
        }
        if (!this.#isBookExist({wishlist: wishlist, book_id: book_id})) {
            return await this.#addToList({wishlist: wishlist, book_id: book_id})
        } else {
            return await this.#deleteFromList({wishlist: wishlist, book_id: book_id})
        }
    }

    async #create(user_id) {
        return await Wishlist.create({user_id: user_id});
    }

    #isBookExist({wishlist, book_id}) {
        return wishlist.books === null ? true : wishlist.books.find((book) => book._id.toString() === book_id);
    }

    async #addToList({wishlist, book_id}) {
        wishlist.books.push(book_id);
        await wishlist.save();
        return wishlist;
    }

    async #deleteFromList({wishlist, book_id}) {
        const bookIndex = wishlist.books.findIndex(book => book._id.toString() === book_id);
        wishlist.books.splice(bookIndex, 1);
        await wishlist.save();
        return wishlist;
    }


}

export {WishlistService};