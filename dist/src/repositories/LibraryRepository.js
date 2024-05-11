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
exports.LibraryRepository = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
exports.LibraryRepository = {
    getAllBooks(userData, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.book.findMany({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    photo_path: true,
                    file_path: true,
                    genre: {
                        select: {
                            genre: true
                        }
                    },
                    Feedback: {
                        select: {
                            student: {
                                select: {
                                    first_name: true,
                                }
                            },
                            title: true,
                            text: true
                        }
                    }
                },
                where: {
                    genre: {
                        type: {
                            type: filters.type
                        },
                        genre: filters.genre
                    },
                    year: filters.year,
                    title: {
                        contains: filters.name
                    },
                    author: {
                        contains: filters.name
                    },
                    university_id: userData.universityId,
                },
            });
        });
    },
    GetBookById(userData, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            return prisma.book.findFirst({
                select: {
                    id: true,
                    title: true,
                    description: true,
                    photo_path: true,
                    file_path: true,
                    genre: {
                        select: {
                            genre: true
                        }
                    },
                    Feedback: {
                        select: {
                            student: {
                                select: {
                                    first_name: true,
                                }
                            },
                            title: true,
                            text: true
                        }
                    }
                },
                where: {
                    id: bookId,
                    university_id: userData.universityId
                }
            });
        });
    }
};
