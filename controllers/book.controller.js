import {BookService} from "../services/book.service.mjs";

class BookController {

    constructor() {
        this.bookService = new BookService();
    }

    async findAll(request, response) {
        const books = await this.bookService.findAll()
        response.status(200).json(books)
    }

    async findOne(request, response) {
        const {id} = request.params;
        const book = await this.bookService.findOne(id);
        response.status(200).json(book);
    }

    async create(request, response) {
        const {name, description, price, price_after_discount, quantity, image, authors, pageCount} = request.body;
        const book = await this.bookService.create({
            name,
            description,
            price,
            price_after_discount,
            quantity,
            image,
            authors,
            pageCount
        });
        response.status(201).json(book);
    }

    update(request, response) {

    }

    delete(request, response) {
    }
}

export {BookController};