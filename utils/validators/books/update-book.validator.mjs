import {body, param} from "express-validator";
import {Book} from "../../../models/book.model.mjs";
import {Category} from "../../../models/category.model.mjs";
import {SubCategory} from "../../../models/subcategory.model.mjs";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const updateBookValidator = [
    param('id')
        .isMongoId().withMessage('book id is invalid')
        .custom((id) => {
            const isExist = Book.findById(id);
            if (!isExist) {
                throw new Error(`Book ${id} not exists`);
            }
            return true;
        }),

    body('name')
        .optional()
        .notEmpty().withMessage('Book name is required')
        .isLength({min: 3, max: 100}).withMessage('Book name must be between 3 and 100 characters')
        .custom(async (name, {req}) => {
            // Check if a book with the same name already exists
            const existingBook = await Book.findById(req.params.id); // Use req.params.id to get the book ID from the URL parameter
            if (existingBook && existingBook.name !== name) {
                const isNameExist = await Book.findOne({name: name});
                if (isNameExist) {
                    throw new Error('Book name must be unique');
                }
            }
            return true;
        }),

    body('description')
        .optional()
        .notEmpty().withMessage('Book description is required')
        .isLength({min: 20}).withMessage('Book description must be at least 20 characters'),

    body('price')
        .optional()
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
        .optional()
        .notEmpty().withMessage('Book quantity is required')
        .isInt({min: 1}).withMessage('Book quantity must be a valid integer and at least one'),

    body('authors')
        .optional()
        .notEmpty().withMessage('Book authors is required')
        .isArray().withMessage('Book authors must be an array'),

    body('pageCount')
        .optional()
        .notEmpty().withMessage('Book page count is required')
        .isInt({min: 50}).withMessage('Book page count must be a valid integer and at least 50'),

    body('image')
        .optional()
        .notEmpty().withMessage('Book image is required')
        .isString().withMessage('Book image must be a string'),

    body("category_id")
        .optional()
        .notEmpty().withMessage("Book category id is required")
        .isMongoId().withMessage('Book category id is invalid')
        .custom(async (id) => {
            const existingCategory = await Category.findById(id);
            if (!existingCategory) throw new Error(`category id ${id} not exists`);
            else return true;
        }),

    body('subcategories_id')
        .optional()
        .isArray().withMessage('Book subcategories id must be an array')
        .custom((values) => {
            values.forEach(async (id) => {
                if (!await SubCategory.findById(id)) {
                    throw new Error(`subcategory id ${id} not found`);
                }
            })
            return true;
        }),
    validatorMiddleware
];

export {updateBookValidator};

