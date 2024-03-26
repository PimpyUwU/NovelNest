import {Request, Response} from "express";

export const LibraryController = {
    async LibraryGet(req : Request, res : Response){
        res.send("library get")
    }
}