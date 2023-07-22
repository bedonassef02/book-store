import express from "express";
import {CartController} from "../controllers/cart.controller.js";
import {authMiddleware} from "../middlewares/auth.middleware.mjs";
import {roleGuard} from "../guards/role.guard.js";
import {addItemToCartValidator} from "../utils/validators/carts/add-item-to-cart.validator.mjs";
import {deleteFromCartValidator} from "../utils/validators/carts/delete-from-cart.validator.mjs";
import {truncateCartValidator} from "../utils/validators/carts/truncate-cart.validator.mjs";

const cartRouter = express.Router();

const cartController = new CartController();

cartRouter.route('/')
    .get(authMiddleware, cartController.findOne.bind(cartController))
    .post(authMiddleware,addItemToCartValidator, cartController.addItem.bind(cartController))
    .delete(authMiddleware,deleteFromCartValidator,cartController.delete.bind(cartController))

cartRouter.route('/:id')
    .delete(authMiddleware,truncateCartValidator,cartController.truncate.bind(cartController))

export {cartRouter};
