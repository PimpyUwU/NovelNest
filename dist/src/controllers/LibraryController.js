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
exports.LibraryController = void 0;
const LibraryService_1 = require("../services/LibraryService");
const HTTP_CODES_1 = __importDefault(require("../HTTP_CODES"));
exports.LibraryController = {
    getBooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {
                userID: +res.locals.userId,
                universityId: +res.locals.universityId,
                isVerified: res.locals.isVerified
            };
            const filters = req.query;
            const books = yield LibraryService_1.LibraryService.GetAllBooks(userData, filters);
            if (!books) {
                res.status(HTTP_CODES_1.default.NO_CONTENT_204).send();
                return;
            }
            res.status(HTTP_CODES_1.default.OK_200).send(books);
        });
    },
    GetBookById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = {
                userID: +res.locals.userId,
                universityId: +res.locals.universityId,
                isVerified: res.locals.isVerified
            };
            const id = +req.params.id;
            const book = yield LibraryService_1.LibraryService.GetBookByID(userData, id);
            if (!book) {
                res.status(HTTP_CODES_1.default.NO_CONTENT_204).send();
                return;
            }
            res.status(HTTP_CODES_1.default.OK_200).send(book);
        });
    }
};
