import express from "express";
import {CategoryController} from "../controllers/category.controller.js";
import {findOneCategoryValidator} from "../utils/validators/categories/find-one.validator.mjs";
import {createCategoryValidator} from "../utils/validators/categories/create-category.validator.mjs";
import {validationResult} from "express-validator";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

// Apply the createCategoryValidator middleware to the post route
categoryRouter.route('/')
    .get(categoryController.findAll.bind(categoryController))
    .post(createCategoryValidator, validateRequest, categoryController.create.bind(categoryController));

categoryRouter.route('/:id')
    .get(findOneCategoryValidator, validateRequest, categoryController.findOne.bind(categoryController))


// Custom middleware to handle validation errors
function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}


export {categoryRouter};
