import express from "express";
import {CategoryController} from "../controllers/category.controller.js";
import {createCategoryValidator} from "../utils/validators/categories/create-category.validator.mjs";
import {findOneCategoryValidator} from "../utils/validators/categories/find-one-category.validator.mjs";
import {deleteCategoryValidator} from "../utils/validators/categories/delete-category.validator.js";
import {updateCategoryValidator} from "../utils/validators/categories/update-category.validator.mjs";
import {authMiddleware} from "../middlewares/auth.middleware.mjs";
import {roleGuard} from "../guards/role.guard.js";

const categoryRouter = express.Router();
const categoryController = new CategoryController();

// Apply the createCategoryValidator middleware to the post route
categoryRouter.route('/')
    .get(categoryController.findAll.bind(categoryController))
    .post(authMiddleware, roleGuard(['admin', 'editor', 'manager']), createCategoryValidator, categoryController.create.bind(categoryController));

categoryRouter.route('/:id')
    .get(findOneCategoryValidator, categoryController.findOne.bind(categoryController))
    .put(authMiddleware, roleGuard(['admin', 'editor', 'manager']), updateCategoryValidator, categoryController.update.bind(categoryController))
    .delete(authMiddleware, roleGuard(['admin']), deleteCategoryValidator, categoryController.delete.bind(categoryController));


export {categoryRouter};
