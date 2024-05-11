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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const AuthRepository_1 = require("../repositories/AuthRepository");
exports.AuthService = {
    logIn(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthRepository_1.AuthRepository.logIn(userData);
            if (!user) {
                return null;
            }
            return {
                userId: user.id,
                university_id: user.university_id,
                name: `${user.first_name} ${user.last_name}`,
                isic: user.isic,
                is_verified: user.is_verified
            };
        });
    },
    signUp(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield AuthRepository_1.AuthRepository.signIn(userData);
            if (!user) {
                return null;
            }
            return {
                userId: user.id,
                university_id: user.university_id,
                name: `${user.first_name} ${user.last_name}`,
                isic: user.isic,
                is_verified: user.is_verified
            };
        });
    },
    getAllUni() {
        return __awaiter(this, void 0, void 0, function* () {
            return AuthRepository_1.AuthRepository.getAllUni();
        });
    }
};
