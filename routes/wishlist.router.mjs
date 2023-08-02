import express from "express";
import {WishlistController} from "../controllers/wishlist.controller.js";
import {toggleBookValidator} from "../utils/validators/wishlist/toggle-book.validator.mjs";
import {roleGuard} from "../guards/role.guard.js";
import {authMiddleware} from "../middlewares/auth.middleware.mjs";

const wishlistRouter = express.Router();
const wishlistController = new WishlistController();

wishlistRouter.route('/:book_id')
    .post(authMiddleware, toggleBookValidator, wishlistController.toggleBook.bind(wishlistController))

wishlistRouter.route('/')
    .get(authMiddleware, roleGuard(['user']), wishlistController.findOne.bind(wishlistController))


export {wishlistRouter};
