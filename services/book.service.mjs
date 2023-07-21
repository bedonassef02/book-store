import {Book} from "../models/book.model.mjs";
import {ApiFeatures} from "../utils/api.features.mjs";

class BookService {

    constructor() {
        this.apiFeatures = null;
    }

    async findAll(query) {
        const count = await Book.countDocuments();
        const allowedFilters = ['price', 'pageCount'];
        this.apiFeatures = new ApiFeatures(Book.find(), query).search(['name', 'description']).filter(allowedFilters).fields().paginate(count);
        const {mongooseQuery, paginationDetails} = this.apiFeatures;
        const books = await mongooseQuery
        return {...paginationDetails, books};
    }

    async findOne(id) {
        return Book.findById(id);
    }

    async create(book) {
        return await Book.create(book);
    }

    async update(id, book) {
        return Book.findByIdAndUpdate(id, book, {new: true});
    }

    async delete(id) {
        await Book.findByIdAndDelete(id);
    }
}

export {BookService};