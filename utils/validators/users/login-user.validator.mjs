import {body} from "express-validator";
import {User} from "../../../models/user.model.mjs";
import {validatorMiddleware} from "../../../middlewares/validator.middleware.mjs";

const loginUserValidator = [
    body('email')
        .notEmpty().withMessage('email is required')
        .isEmail().withMessage('email must be valid email address')
        .custom(async (email) => {
            const isExist = await User.findOne({email: email})
            if (isExist) {
                return true
            }
            throw new Error(`User ${email} not exists`)
        }),

    validatorMiddleware
]

export {loginUserValidator};