import {param} from "express-validator";
import {Category} from "../../../models/category.model.mjs";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const deleteCategoryValidator = [
    param('id')
        .isMongoId().withMessage('category id is invalid')
        .custom(async (id) => {
            const existingCategory = await Category.findById(id);
            if (!existingCategory) {
                throw new Error('Category not found');
            }
            return true;
        }),
    validatorMiddleware
];

export {deleteCategoryValidator};

