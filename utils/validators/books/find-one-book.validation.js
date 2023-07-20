import {param} from "express-validator";

const findOneBookValidator = [
    param('id')
        .isMongoId().withMessage('book id is invalid')
];

export {findOneBookValidator};

