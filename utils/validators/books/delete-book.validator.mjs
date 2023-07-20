import {param} from "express-validator";
import {Book} from "../../../models/book.model.mjs";

const deleteBookValidator = [
    param('id')
        .isMongoId().withMessage('book id is invalid')
        .custom(async (value) => {
            const existingBook = await Book.findOne({name: value});
            if (existingBook) {
                throw new Error('Book not found');
            }
            return true;
        })
];

export {deleteBookValidator};

