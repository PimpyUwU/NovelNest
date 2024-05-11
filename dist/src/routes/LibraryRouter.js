"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLibraryRouter = void 0;
const express_1 = __importDefault(require("express"));
const LibraryController_1 = require("../controllers/LibraryController");
const AuthMiddleware_1 = require("../middleware/AuthMiddleware");
const GetLibraryRouter = () => {
    const router = express_1.default.Router();
    router.get('/', AuthMiddleware_1.AuthMiddleware.checkUserRoleAndId, LibraryController_1.LibraryController.getBooks);
    router.get('/:id', AuthMiddleware_1.AuthMiddleware.checkUserRoleAndId, LibraryController_1.LibraryController.GetBookById);
    return router;
};
exports.GetLibraryRouter = GetLibraryRouter;
