import express from "express";
import {BookController} from "../controllers/book.controller.js";
import {createBookValidator} from "../utils/validators/books/create-book.validator.mjs";
import {findOneBookValidator} from "../utils/validators/books/find-one-book.validation.js";
import {updateBookValidator} from "../utils/validators/books/update-book.validator.mjs";
import {deleteBookValidator} from "../utils/validators/books/delete-book.validator.mjs";
import {uploadImage} from "../middlewares/upload-image.middleware.mjs";
import {authMiddleware} from "../middlewares/auth.middleware.mjs";
import {roleGuard} from "../guards/role.guard.js";

const bookRouter = express.Router();
const bookController = new BookController();

// Apply the createBookValidator middleware to the post route
bookRouter.route('/')
    .get(bookController.findAll.bind(bookController))
    .post(authMiddleware, roleGuard(['admin', 'editor', 'manager']), uploadImage, createBookValidator, bookController.create.bind(bookController));

bookRouter.route('/:id')
    .get(findOneBookValidator, bookController.findOne.bind(bookController))
    .put(authMiddleware, roleGuard(['admin', 'editor', 'manager']), uploadImage, updateBookValidator, bookController.update.bind(bookController))
    .delete(authMiddleware, roleGuard(['admin']), deleteBookValidator, bookController.delete.bind(bookController));


export {bookRouter};
