import fs from "fs";
import path from 'path';
import {BookPlateViewModel} from "../../types/models/Library/out/BookPlateViewModel";
import {BookOrmModelOut} from "../../types/models/Library/out/BookOrmModelOut";
import {LibraryRepository} from "../repositories/LibraryRepository";
import {BookFilters} from "../../types/models/Library/in/BookFilters";
import {UserJWTData} from "../../types/models/Auth/in/UserJWTData";
import {BookViewModel} from "../../types/models/Library/out/BookViewModel";


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
                photo: EncodeFileToBase64(book.photo_path)
            }
        })
    },

    async GetBookByID(userData : UserJWTData, bookId : number) : Promise<BookViewModel | null>{
        const book : BookOrmModelOut | null = await LibraryRepository.GetBookById(userData, bookId)

        if(!book){
            return null
        }

        return {
            title : book.title,
            description : book.description,
            photo : EncodeFileToBase64(book.photo_path),
            file : EncodeFileToBase64(book.file_path),
            genre : book.genre.genre,
            Feedback : book.Feedback
        }

    }
}

function EncodeFileToBase64(filePath : string) : string{
    const file : Buffer = fs.readFileSync(path.resolve(__dirname, filePath))
    return file.toString('base64')
}