import {param} from "express-validator";
import {Coupon} from "../../../models/coupon.model.mjs";
import {Book} from "../../../models/book.model.mjs";
import moment from 'moment'
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const applyCouponValidator = [
    param('code')
        .isString().withMessage('code must be a string')
        .custom(async (code) => {
            const coupon = await Coupon.findOne({code: code});
            if (!coupon) throw new Error(`code ${code} not found`);

            // Check if the coupon has expired
            console.log(coupon.expirationDate)
            console.log(moment())
            if (moment(coupon.expirationDate).isBefore(moment())) {
                throw new Error(`code ${code} has expired`);
            }

            return true;
        }),

    param('book_id')
        .isMongoId().withMessage('book_id must be a valid Mongo ID')
        .custom(async (id) => {
            const book = await Book.findById(id);
            if (!book) throw new Error(`book ${id} not found`)
            else return true;
        }),

    validatorMiddleware
]

export {applyCouponValidator};