import {body, param} from "express-validator";
import {Category} from "../../../models/category.model.mjs";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const updateCategoryValidator = [
    param('id')
        .isMongoId().withMessage('category id is invalid')
        .custom((id) => {
            const isExist = Category.findById(id);
            if (!isExist) {
                throw new Error(`Category ${id} not exists`);
            }
            return true;
        }),
    body('name')
        .optional()
        .isLength({min: 3, max: 100}).withMessage('Category name must be between 3 and 100 characters')
        .custom(async (name, {req}) => {
            // Check if a category with the same name already exists
            const existingCategory = await Category.findById(req.params.id); // Use req.params.id to get the category ID from the URL parameter
            if (existingCategory && existingCategory.name !== name) {
                const isNameExist = await Category.findOne({name: name});
                if (isNameExist) {
                    throw new Error('Category name must be unique');
                }
            }
            return true;
        }),
    validatorMiddleware
]

export {updateCategoryValidator}