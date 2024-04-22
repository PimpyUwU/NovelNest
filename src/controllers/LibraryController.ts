import {Request, Response} from "express";
import {RequestWithQueryParam, RequestWithURIParam} from "../../types/RequestTypes";
import {BookFilters} from "../../types/models/Library/in/BookFilters";

export const LibraryController = {
    async getBooks(req : Request, res : Response){
        const userData = {
            userID: +res.locals.userId,
            universityId : +res.locals.universityId,
            isVerified : res.locals.isVerified
        }


    }
}

