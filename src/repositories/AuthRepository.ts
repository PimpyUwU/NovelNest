import {PrismaClient} from "@prisma/client";
import {LogInRequestModel} from "../../types/models/Auth/in/LogInRequestModel";
import {UserORMModelOut} from "../../types/models/Auth/out/UserORMModelOut";
import bcrypt from "bcrypt"
import {SignUpRequestModel} from "../../types/models/Auth/in/SignUpRequestModel";
import {UniversityViewModel} from "../../types/models/Auth/out/UniversityViewModel";

const prisma: PrismaClient = new PrismaClient()

export const AuthRepository = {
    async logIn(userData: LogInRequestModel): Promise<UserORMModelOut | null> {
        const user: UserORMModelOut | null = await prisma.student.findFirst({
            where: {
                isic: userData.isic
            },
            include: {
                university: {
                    select: {
                        id : true,
                        name: true
                    }
                }
            }
        })

        if (!user) {
            return null
        }
        if (!await bcrypt.compare(userData.password, user.password)) {
            return null
        }

        return user
    },

    async signIn(userData: SignUpRequestModel): Promise<UserORMModelOut | null> {
        const salt = await bcrypt.genSalt()

        if(!userData.password || !userData.isic){
            return null
        }

        userData.password = await bcrypt.hash(userData.password, salt)

        try{
            await prisma.student.create({
                data : {
                    first_name : userData.first_name,
                    last_name : userData.last_name,
                    password : userData.password,
                    isic : userData.isic,
                    university_id : userData.university_id,
                    is_verified : false
                }

            })
        }
        catch (err){
            return null
        }

        return prisma.student.findFirst({
            where: {
                isic: userData.isic
            },
            include: {
                university: {
                    select: {
                        id : true,
                        name: true
                        
                    }
                }
            }
        })
    },

    async getAllUni() : Promise<UniversityViewModel[]>{
        return prisma.university.findMany(
            {
                select : {
                    id : true,
                    name : true
                }
            }
        )
    }
}