import express from "express";
import {CategoryController} from "../controllers/category.controller.js";
import {createCategoryValidator} from "../utils/validators/categories/create-category.validator.mjs";
import {findOneCategoryValidator} from "../utils/validators/categories/find-one-category.validator.mjs";
import {deleteCategoryValidator} from "../utils/validators/categories/delete-category.validator.js";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

// Apply the createCategoryValidator middleware to the post route
categoryRouter.route('/')
    .get(categoryController.findAll.bind(categoryController))
    .post(createCategoryValidator, categoryController.create.bind(categoryController));

categoryRouter.route('/:id')
    .get(findOneCategoryValidator, categoryController.findOne.bind(categoryController))
    .delete(deleteCategoryValidator, categoryController.delete.bind(categoryController));


export {categoryRouter};
