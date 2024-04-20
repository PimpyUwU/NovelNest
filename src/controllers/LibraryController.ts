import {Request, Response} from "express";

export const LibraryController = {
    async getBooks(req : Request, res : Response){
        const userID : number = +res.locals.userId
        const universityId : number = +res.locals.universityId
        const isVerified : number = res.locals.isVerified


    }
}