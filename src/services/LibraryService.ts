import fs from "fs";
import {BookPlateViewModel} from "../../types/models/Library/out/BookPlateViewModel";
import {BookOrmModelOut} from "../../types/models/Library/out/BookOrmModelOut";
import {LibraryRepository} from "../repositories/LibraryRepository";
import {BookFilters} from "../../types/models/Library/in/BookFilters";
import {UserJWTData} from "../../types/models/Auth/in/UserJWTData";

export const LibraryService = {
    async GetAllBooks(userData : UserJWTData, filters : BookFilters) : Promise<BookPlateViewModel[] | null>{
        const books : BookOrmModelOut[] | null = await LibraryRepository.getAllBooks(userData, filters)

        if(!books){
            return null
        }

        return books.map((book: BookOrmModelOut): BookPlateViewModel => {
            return {
                title: book.title,
                description: book.description,
                photo: EncodeIMGtoBase64(book.photo_path)
            }
        })
    }
}

function EncodeIMGtoBase64(path : string) : string | null{
    const image : Buffer = fs.readFileSync(path)

    if (image){
        return image.toString('base64')
    }
    return null
}