import {body} from "express-validator";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";
import {Book} from "../../../models/book.model.mjs";

const addItemToCartValidator = [
    body('book_id')
        .notEmpty().withMessage('book id is required')
        .isMongoId().withMessage('not a valid id')
        .custom(async (id) => {
            const isExist = await Book.findById(id);
            if (!isExist) {
                throw new Error(`Book ${id} not exists`);
            }
            return true;
        }),

    validatorMiddleware
];

export {addItemToCartValidator};
