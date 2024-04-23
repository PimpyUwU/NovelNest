import {BookOrmModelOut} from "../../types/models/Library/out/BookOrmModelOut";
import {PrismaClient} from "@prisma/client";
import {BookFilters} from "../../types/models/Library/in/BookFilters";
import {UserJWTData} from "../../types/models/Auth/in/UserJWTData";

const prisma: PrismaClient = new PrismaClient()

export const LibraryRepository = {
    async getAllBooks(userData : UserJWTData, filters : BookFilters) : Promise<BookOrmModelOut[] | null>{
        return prisma.book.findMany({
            select: {
                id: true,
                title: true,
                description:
                    true,
                photo_path: true,
                file_path: true,
                genre: {
                    select: {
                        genre: true
                    }
                }
            },
            where: {
                genre: {
                    genre: filters.genre
                },
                year: filters.year,
                title: {
                    contains: filters.name

                },
                author: {
                    contains: filters.name
                },
                university_id: userData.universityId
            },
        })
    },

    async GetBookById(){

    }
}