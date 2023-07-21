import express from "express";
import {BookController} from "../controllers/book.controller.js";
import {validationResult} from "express-validator";
import {createBookValidator} from "../utils/validators/books/create-book.validator.mjs";
import {findOneBookValidator} from "../utils/validators/books/find-one-book.validation.js";
import {updateBookValidator} from "../utils/validators/books/update-book.validator.mjs";
import {deleteBookValidator} from "../utils/validators/books/delete-book.validator.mjs";

const bookRouter = express.Router();
const bookController = new BookController();

// Apply the createBookValidator middleware to the post route
bookRouter.route('/')
    .get(bookController.findAll.bind(bookController))
    .post(createBookValidator, bookController.create.bind(bookController));

bookRouter.route('/:id')
    .get(findOneBookValidator, bookController.findOne.bind(bookController))
    .put(updateBookValidator, bookController.update.bind(bookController))
    .delete(deleteBookValidator, bookController.delete.bind(bookController));


export {bookRouter};
