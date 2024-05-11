"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAuthRouter = void 0;
const express_1 = __importDefault(require("express"));
const AuthController_1 = require("../controllers/AuthController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const GetAuthRouter = () => {
    const router = express_1.default.Router();
    router.get('/log-in', AuthController_1.AuthController.logInGet);
    router.post('/log-in', AuthController_1.AuthController.logInPost);
    router.get('/sign-up', AuthController_1.AuthController.signInGet);
    router.post('/sign-up', AuthController_1.AuthController.signInPost);
    router.post('/log-out', AuthMiddleware_1.AuthMiddleware.requireAuthorization, AuthController_1.AuthController.logOut);
    return router;
};
exports.GetAuthRouter = GetAuthRouter;
