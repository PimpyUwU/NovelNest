import express from "express";
import {AuthController} from "../controllers/AuthController";
import {AuthMiddleware} from "../middleware/AuthMiddleware";

export const GetAuthRouter = () => {
    const router = express.Router()

    router.get('/log-in', AuthController.logInGet)

    router.post('/log-in', AuthController.logInPost)

    router.get('/sign-up', AuthController.signInGet)

    router.post('/sign-up', AuthController.signInPost)

    router.post('/log-out', AuthMiddleware.requireAuthorization, AuthController.logOut)

    return router
}