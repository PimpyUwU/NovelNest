import express from "express";
import {LibraryController} from "../controllers/LibraryController";

export const GetLibraryRouter = () => {
    const router : express.Router = express.Router()

    router.get("/", LibraryController.LibraryGet)


    return router
}
