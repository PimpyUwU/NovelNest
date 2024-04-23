import {BookOrmModelOut} from "../../types/models/Library/out/BookOrmModelOut";
import {PrismaClient} from "@prisma/client";
import {BookFilters} from "../../types/models/Library/in/BookFilters";
import {UserJWTData} from "../../types/models/Auth/in/UserJWTData";

const prisma: PrismaClient = new PrismaClient()

export const LibraryRepository = {
    async getAllBooks(userData : UserJWTData, filters : BookFilters) : Promise<BookOrmModelOut[] | null>{
        prisma.book.findMany({
            where : {
                genre : filters.genre,
            }
        })


    }
}