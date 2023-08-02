import {param} from "express-validator";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";
import {Book} from "../../../models/book.model.mjs";

const toggleBookValidator = [
    param('book_id')
        .isMongoId().withMessage('invalid mongo id')
        .custom((id) => {
            const isExist = Book.findById(id);
            if (!isExist) {
                throw new Error(`Book ${id} not exists`);
            }
            return true;
        }),

    validatorMiddleware
]

export {toggleBookValidator};