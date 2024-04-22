import {Request, Response} from "express";
import {RequestWithQueryParam, RequestWithURIParam} from "../../types/RequestTypes";
import {BookFilters} from "../../types/models/Library/in/BookFilters";
import {BookPlateViewModel} from "../../types/models/Library/out/BookPlateViewModel";
import {LibraryService} from "../services/LibraryService";
import HTTP_CODES from "../HTTP_CODES";

export const LibraryController = {
    async getBooks(req : RequestWithQueryParam<BookFilters>,
                   res : Response<BookPlateViewModel>){

        const userData = {
            userID: +res.locals.userId,
            universityId : +res.locals.universityId,
            isVerified : res.locals.isVerified
        }

        const filters = req.query

        const books : BookPlateViewModel = await LibraryService.GetAllBooks(userData, filters)

        if(!books){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
            return
        }
        res.status(HTTP_CODES.OK_200).send(books)
    }
}

