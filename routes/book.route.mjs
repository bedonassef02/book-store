import express from "express";
import {BookController} from "../controllers/book.controller.js";
import {validationResult} from "express-validator";
import {createBookValidator} from "../utils/validators/books/create-book.validator.mjs";
import {findOneBookValidator} from "../utils/validators/books/find-one-book.validation.js";

const bookRouter = express.Router();
const bookController = new BookController();

// Apply the createBookValidator middleware to the post route
bookRouter.route('/')
    .get(bookController.findAll.bind(bookController))
    .post(createBookValidator, validateRequest, bookController.create.bind(bookController));

bookRouter.route('/:id')
    .get(findOneBookValidator, validateRequest, bookController.findOne.bind(bookController))

// Custom middleware to handle validation errors
function validateRequest(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    next();
}

export {bookRouter};
