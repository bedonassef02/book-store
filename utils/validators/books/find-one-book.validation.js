import {param} from "express-validator";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const findOneBookValidator = [
    param('id')
        .isMongoId().withMessage('book id is invalid'),
    validatorMiddleware
];

export {findOneBookValidator};

