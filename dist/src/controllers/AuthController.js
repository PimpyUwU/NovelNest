"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const HTTP_CODES_1 = __importDefault(require("../HTTP_CODES"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../../env");
exports.AuthController = {
    logInGet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.status(200).send();
        });
    },
    logInPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authData = req.body;
            const user = yield AuthService_1.AuthService.logIn(authData);
            if (!user) {
                res.status(HTTP_CODES_1.default.UNAUTHORIZED_401).send();
                return;
            }
            const token = yield createJwt(user.userId, user.university_id, user.is_verified);
            //successfully logged-in user
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            res.status(HTTP_CODES_1.default.OK_200).json(user).send();
        });
    },
    signInGet(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const universities = yield AuthService_1.AuthService.getAllUni();
            res.status(HTTP_CODES_1.default.OK_200).send(universities);
        });
    },
    signInPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const authData = req.body;
            authData.university_id = Number(authData.university_id);
            const user = yield AuthService_1.AuthService.signUp(authData);
            if (!user) {
                res.status(HTTP_CODES_1.default.UNAUTHORIZED_401).send();
                return;
            }
            const token = yield createJwt(user.userId, user.university_id, user.is_verified);
            //successfully logged-in user
            res.cookie('jwt', token, {
                httpOnly: true,
                maxAge: 3 * 24 * 60 * 60 * 1000
            });
            res.status(HTTP_CODES_1.default.OK_200).json(user).send();
        });
    },
    logOut(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.cookie('jwt', '', {
                maxAge: 1,
                httpOnly: true
            }).redirect('/');
        });
    }
};
const createJwt = (userId, universityId, isVerified) => __awaiter(void 0, void 0, void 0, function* () {
    return jsonwebtoken_1.default.sign({ userId: userId, universityId: universityId, isVerified: isVerified }, env_1.SECRET_KEY, {
        expiresIn: 3 * 24 * 60 * 60
    });
});
