import {body} from "express-validator";
import {Category} from "../../../models/category.model.mjs";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const createCategoryValidator = [
    body('name')
        .notEmpty().withMessage('Category name is required')
        .isLength({min: 3, max: 50}).withMessage('Category name must be between 3 and 50 characters')
        .custom(async (value) => {
            // Check if a category with the same name already exists
            const existingCategory = await Category.findOne({name: value});
            if (existingCategory) {
                throw new Error('Category name must be unique');
            }
            return true;
        }),
    validatorMiddleware
];

export {createCategoryValidator};

