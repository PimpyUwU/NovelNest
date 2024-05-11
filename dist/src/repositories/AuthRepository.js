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
exports.AuthRepository = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
exports.AuthRepository = {
    logIn(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.student.findFirst({
                where: {
                    isic: userData.isic
                },
                include: {
                    university: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            if (!user) {
                return null;
            }
            if (!(yield bcrypt_1.default.compare(userData.password, user.password))) {
                return null;
            }
            return user;
        });
    },
    signIn(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcrypt_1.default.genSalt();
            if (!userData.password || !userData.isic) {
                return null;
            }
            userData.password = yield bcrypt_1.default.hash(userData.password, salt);
            try {
                yield prisma.student.create({
                    data: {
                        first_name: userData.first_name,
                        last_name: userData.last_name,
                        password: userData.password,
                        isic: userData.isic,
                        university_id: userData.university_id,
                        is_verified: false
                    }
                });
            }
            catch (err) {
                return null;
            }
            return prisma.student.findFirst({
                where: {
                    isic: userData.isic
                },
                include: {
                    university: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
        });
    },
    getAllUni() {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.university.findMany({
                select: {
                    id: true,
                    name: true
                }
            });
        });
    }
};
