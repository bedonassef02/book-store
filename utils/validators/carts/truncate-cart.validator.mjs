import {param} from "express-validator";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const truncateCartValidator = [
    param('id')
        .notEmpty().withMessage('cart id is required')
        .isMongoId().withMessage('cart id is not valid'),

    validatorMiddleware
]

export {truncateCartValidator}