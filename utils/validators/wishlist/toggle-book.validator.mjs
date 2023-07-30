import {param} from "express-validator";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const toggleBookValidator = [
    param('book_id')
        .isMongoId().withMessage('invalid mongo id'),

    validatorMiddleware
]

export {toggleBookValidator};