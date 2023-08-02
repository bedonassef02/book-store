import express from "express";
import {roleGuard} from "../guards/role.guard.js";
import {authMiddleware} from "../middlewares/auth.middleware.mjs";
import {CouponController} from "../controllers/coupon.controller.js";
import {createCouponValidator} from "../utils/validators/coupon/create-coupon.validator.mjs";
import {applyCouponValidator} from "../utils/validators/coupon/apply-coupon.validator.mjs";

const couponRouter = express.Router();
const couponController = new CouponController();

couponRouter.route('/')
    .post(authMiddleware, roleGuard(['admin', 'manager']), createCouponValidator, couponController.create.bind(couponController))
    .get(authMiddleware, roleGuard(['admin', 'manager']), couponController.findAll.bind(couponController))
    .delete(authMiddleware, roleGuard(['admin', 'manager']), couponController.removeOutdatedCoupons.bind(couponController))

couponRouter.route('/:code')
    .delete(authMiddleware, roleGuard(['admin', 'manager']), couponController.delete.bind(couponController))


couponRouter.route('/:code/books/:book_id')
    .get(authMiddleware, roleGuard(['user']), applyCouponValidator, couponController.applyCoupon.bind(couponController))


export {couponRouter};
