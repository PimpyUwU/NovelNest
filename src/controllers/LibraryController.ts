import {Response} from "express";
import {RequestWithQueryParam, RequestWithURIParam} from "../../types/RequestTypes";
import {BookFilters} from "../../types/models/Library/in/BookFilters";
import {BookPlateViewModel} from "../../types/models/Library/out/BookPlateViewModel";
import {LibraryService} from "../services/LibraryService";
import HTTP_CODES from "../HTTP_CODES";
import {UserJWTData} from "../../types/models/Auth/in/UserJWTData";
import {BookViewModel} from "../../types/models/Library/out/BookViewModel";

export const LibraryController = {
    async getBooks(req : RequestWithQueryParam<BookFilters>,
                   res : Response<BookPlateViewModel[]>){

        const userData : UserJWTData = {
            userID: +res.locals.userId,
            universityId : +res.locals.universityId,
            isVerified : res.locals.isVerified
        }

        const filters = req.query

        if(filters){
            if(filters.year){
                filters.year = +filters.year
            }
        }

        const books : BookPlateViewModel[] | null = await LibraryService.GetAllBooks(userData, filters)

        if(!books){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
            return
        }
        res.status(HTTP_CODES.OK_200).send(books)
    },

    async GetBookById(req : RequestWithURIParam<{id : number}>,
                      res : Response<BookViewModel>){
        const userData : UserJWTData = {
            userID: +res.locals.userId,
            universityId : +res.locals.universityId,
            isVerified : res.locals.isVerified
        }
        const id = +req.params.id

        const book : BookViewModel | null = await LibraryService.GetBookByID(userData, id)

        if(!book){
            res.status(HTTP_CODES.NO_CONTENT_204).send()
            return
        }

        res.status(HTTP_CODES.OK_200).send(book)
    }
}

