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
exports.LibraryService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const LibraryRepository_1 = require("../repositories/LibraryRepository");
exports.LibraryService = {
    GetAllBooks(userData, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield LibraryRepository_1.LibraryRepository.getAllBooks(userData, filters);
            if (!books) {
                return null;
            }
            return books.map((book) => {
                return {
                    title: book.title,
                    description: book.description,
                    photo: EncodeFileToBase64(book.photo_path)
                };
            });
        });
    },
    GetBookByID(userData, bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield LibraryRepository_1.LibraryRepository.GetBookById(userData, bookId);
            if (!book) {
                return null;
            }
            return {
                title: book.title,
                description: book.description,
                photo: EncodeFileToBase64(book.photo_path),
                file: EncodeFileToBase64(book.file_path),
                genre: book.genre.genre,
                Feedback: book.Feedback
            };
        });
    }
};
function EncodeFileToBase64(filePath) {
    const file = fs_1.default.readFileSync(path_1.default.resolve(__dirname, filePath));
    return file.toString('base64');
}
