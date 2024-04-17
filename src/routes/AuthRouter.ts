import express from "express";
import {AuthController} from "../controllers/AuthController";

export const GetAuthRouter = () => {
    const router = express.Router()

    router.get('/log-in', AuthController.logInGet)

    router.post('/log-in', AuthController.logInPost)

    router.get('/sign-up', AuthController.signInGet)

    router.post('/sign-up', AuthController.signInPost)

    router.post('log-out', AuthController.logOut)

    return router
}