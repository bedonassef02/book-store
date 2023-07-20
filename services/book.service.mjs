import {Book} from "../models/book.model.mjs";

class BookService {

    async findAll() {
        return Book.find();
    }

    async findOne(id) {
        return Book.findById(id);
    }

    async create(book) {
        return await Book.create(book);
    }
}

export {BookService};