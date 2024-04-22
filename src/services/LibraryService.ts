import fs from "fs";
import {BookPlateViewModel} from "../../types/models/Library/out/BookPlateViewModel";
import {BookOrmModelOut} from "../../types/models/Library/out/BookOrmModelOut";
import {LibraryRepository} from "../repositories/LibraryRepository";

export const LibraryService = {
    async GetAllBooks(userData, filters) : Promise<BookPlateViewModel[] | null>{
        const books : BookOrmModelOut | null = await LibraryRepository.getAllBooks(userData, filters)

        if(!books){
            return null
        }

        const booksView : BookPlateViewModel
    }
}

function EncodeIMGtoBase64(path : string) : string | null{
    const image : Buffer = fs.readFileSync(path)

    if (image){
        return image.toString('base64')
    }
    return null
}