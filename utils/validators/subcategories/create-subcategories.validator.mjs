import {body} from "express-validator";
import {SubCategory} from "../../../models/subcategory.model.mjs";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";
import {Category} from "../../../models/category.model.mjs";

const createSubCategoryValidator = [
    body('name')
        .notEmpty().withMessage('SubCategory name is required')
        .isLength({min: 3, max: 50}).withMessage('SubCategory name must be between 3 and 50 characters')
        .custom(async (value) => {
            // Check if a subcategory with the same name already exists
            const existingSubCategory = await SubCategory.findOne({name: value});
            if (existingSubCategory) {
                throw new Error('Category name must be unique');
            }
            return true;
        }),
    body('category_id')
        .notEmpty().withMessage('category id is required')
        .custom(async (id) => {
            const existingCategory = await Category.findById(id);
            if (existingCategory) return true
            else throw new Error('Category id must be existing');
        })
    ,
    validatorMiddleware
];

export {createSubCategoryValidator};

