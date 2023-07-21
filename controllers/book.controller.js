import {BookService} from "../services/book.service.mjs";

class BookController {

    constructor() {
        this.bookService = new BookService();
    }

    async findAll(request, response) {
        const books = await this.bookService.findAll(request.query);
        response.status(200).json(books)
    }

    async findOne(request, response) {
        const {id} = request.params;
        const book = await this.bookService.findOne(id);
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }

    async create(request, response) {
        const {
            name,
            description,
            price,
            price_after_discount,
            quantity,
            image,
            authors,
            pageCount,
            category_id,
            subcategories_id
        } = request.body;
        const book = await this.bookService.create({
            name,
            description,
            price,
            price_after_discount,
            quantity,
            image,
            authors,
            pageCount,
            category_id,
            subcategories_id
        });
        response.status(201).json(book);
    }

    async update(request, response) {
        const {id} = request.params;
        const book = await this.bookService.update(id, request.body);
        if (book) {
            response.status(200).json(book);
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }

    async delete(request, response) {
        const {id} = request.params;
        const book = await this.bookService.delete(id);
        if (book) {
            response.status(200).json({message: `book deleted successfully`});
        } else {
            response.status(404).json(`book not found with id ${id}`);
        }
    }
}

export {BookController};