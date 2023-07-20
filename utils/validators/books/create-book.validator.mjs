import {body} from "express-validator";
import {Book} from "../../../models/book.model.mjs";

const createBookValidator = [
    body('name')
        .notEmpty().withMessage('Book name is required')
        .isLength({min: 3, max: 100}).withMessage('Book name must be between 3 and 100 characters')
        .custom(async (value) => {
            // Check if a book with the same name already exists
            const existingBook = await Book.findOne({name: value});
            if (existingBook) {
                throw new Error('Book name must be unique');
            }
            return true;
        }),

    body('description')
        .notEmpty().withMessage('Book description is required')
        .isLength({min: 20}).withMessage('Book description must be at least 20 characters'),

    body('price')
        .notEmpty().withMessage('Book price is required')
        .isFloat({min: 50, max: 10000}).withMessage('Book price must be between 50 and 10000'),

    body('price_after_discount')
        .optional()
        .isFloat({min: 0, max: 10000}).withMessage('Book price after discount must be between 0 and 10000')
        .custom((value, {req}) => {
            if (value && req.body.price <= value) {
                throw new Error('Price after discount must be greater than book price');
            }
            return true;
        }),

    body('quantity')
        .notEmpty().withMessage('Book quantity is required')
        .isInt({min: 1}).withMessage('Book quantity must be a valid integer and at least one'),

    body('authors')
        .notEmpty().withMessage('Book authors is required')
        .isArray().withMessage('Book authors must be an array'),

    body('pageCount')
        .notEmpty().withMessage('Book page count is required')
        .isInt({min: 50}).withMessage('Book page count must be a valid integer and at least 50'),

    body('image')
        .notEmpty().withMessage('Book image is required')
        .isString().withMessage('Book image must be a string')
];

export {createBookValidator};

