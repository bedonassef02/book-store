import {param} from "express-validator";

const findOneCategoryValidator = [
    param('id')
        .isMongoId().withMessage('book id is invalid')
];

export {findOneCategoryValidator};

