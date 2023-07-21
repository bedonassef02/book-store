import express from "express";
import {AuthController} from "../controllers/auth.controller.js";
import {createUserValidator} from "../utils/validators/users/create-user.validator.mjs";
import {loginUserValidator} from "../utils/validators/users/login-user.validator.mjs";

const authRouter = express.Router();
const authController = new AuthController();

authRouter.route('/register')
    .post(createUserValidator, authController.register.bind(authController));

authRouter.route('/login')
    .post(loginUserValidator, authController.login.bind(authController));


export {authRouter};
