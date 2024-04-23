import express from "express"
import {LibraryController} from "../controllers/LibraryController";
import {AuthMiddleware} from "../middleware/AuthMiddleware";

export const GetLibraryRouter = () => {
    const router = express.Router()

    router.get('/', AuthMiddleware.checkUserRoleAndId, LibraryController.getBooks)

    router.get('/:id', AuthMiddleware.checkUserRoleAndId, LibraryController.GetBookById)


    return router
}