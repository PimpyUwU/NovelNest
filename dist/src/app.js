"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const AuthRouter_1 = require("./routes/AuthRouter");
const LibraryRouter_1 = require("./routes/LibraryRouter");
const cors_1 = __importDefault(require("cors"));
const cookieParser = require("cookie-parser");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(cookieParser());
exports.app.use((0, cors_1.default)({
    origin: 'http://localhost:3000' // Allow requests from this origin
}));
exports.app.use('/auth', (0, AuthRouter_1.GetAuthRouter)());
exports.app.use('/library', (0, LibraryRouter_1.GetLibraryRouter)());
