import {body} from "express-validator";
import {Coupon} from "../../../models/coupon.model.mjs";
import {Book} from "../../../models/book.model.mjs";
import mongoose from "mongoose";
import moment from "moment";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const createCouponValidator = [
    body('code')
        .notEmpty().withMessage('code is required')
        .isString().withMessage('code must be a string')
        .custom(async (code) => {
            const isExist = await Coupon.findOne({code: code});
            if (isExist) throw new Error(`code ${code} is already exists`);
            else return true;
        }),
    body('expirationDate')
        .notEmpty().withMessage('expirationDate is required')
        .custom((value) => {
            // Use moment.js to parse the date in the correct format (YYYY-MM-DD)
            const parsedDate = moment(value, "DD-MM-YYYY", true); // Set the second argument to true for strict parsing
            if (!parsedDate.isValid()) {
                throw new Error('expirationDate must be a valid date in the format DD-MM-YYYY');
            }

            // Check if the parsed date is within the allowed range (e.g., 5 days from the current date)
            const currentDate = moment();
            const maxExpirationDate = moment().add(5, 'days');
            if (parsedDate.isAfter(maxExpirationDate)) {
                throw new Error('expirationDate must be within 5 days from the current date');
            }

            return true;
        }),
    body('discount')
        .notEmpty().withMessage('discount is required')
        .isNumeric().withMessage('discount must be a number')
        .custom((discount) => {
            const maxDiscount = 82;
            if (discount > maxDiscount) {
                throw new Error(`discount cannot exceed ${maxDiscount}`);
            }
            return true;
        }),
    body('books')
        .notEmpty().withMessage('books is required')
        .isArray({min: 1}).withMessage('books must be a non-empty array')
        .custom(async (books) => {
            // Check if each element in the array is a valid Mongoose ObjectId
            const isValidIds = books.every(bookId => mongoose.Types.ObjectId.isValid(bookId));
            if (!isValidIds) {
                throw new Error('books must contain valid Mongoose ObjectIds');
            }

            // Check if all book IDs exist in the database
            const existingBooks = await Book.find({_id: {$in: books}});
            const existingBookIds = existingBooks.map(book => book._id.toString());
            const missingBookIds = books.filter(bookId => !existingBookIds.includes(bookId));

            if (missingBookIds.length > 0) {
                throw new Error(`The following book IDs do not exist: ${missingBookIds.join(', ')}`);
            }

            return true;
        }),
    validatorMiddleware
]

export {createCouponValidator};