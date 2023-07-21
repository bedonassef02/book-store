import express from "express";
import {SubCategoryController} from "../controllers/subcategory.controller.js";
import {createSubCategoryValidator} from "../utils/validators/subcategories/create-subcategories.validator.mjs";

const subCategoryRouter = express.Router();
const subCategoryController = new SubCategoryController();

subCategoryRouter.route('/')
    .get(subCategoryController.findAll.bind(subCategoryController))
    .post(createSubCategoryValidator, subCategoryController.create.bind(subCategoryController));


export {subCategoryRouter};
