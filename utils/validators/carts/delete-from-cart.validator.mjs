import {body, param} from "express-validator";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const deleteFromCartValidator = [
    body('book_id')
        .notEmpty().withMessage('book id is required')
        .isMongoId().withMessage('book id not valid'),

    validatorMiddleware
]

export {deleteFromCartValidator}