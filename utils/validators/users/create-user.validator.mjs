import {body} from "express-validator";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";
import {User} from "../../../models/user.model.mjs";

const createUserValidator = [
    body('username')
        .notEmpty().withMessage('username is required')
        .isLength({min: 3, max: 25}).withMessage('username length must be between 3 and 25 characters'),

    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('email must be a valid email address')
        .custom(async (email) => {
            const isExist = await User.findOne({email: email});
            if (!isExist) return true;
            throw new Error('Email address is already in use')
        }),

    body('password')
        .notEmpty().withMessage('password is required')
        .isLength({min: 6, max: 20}).withMessage('password must be between 6 and 20 characters'),

    validatorMiddleware
]

export {createUserValidator};