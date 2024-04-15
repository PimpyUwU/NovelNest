import {PrismaClient} from "@prisma/client";
import {LogInRequestModel} from "../../types/models/Auth/in/LogInRequestModel";
import {UserORMModelOut} from "../../types/models/Auth/out/UserORMModelOut";
import {SignUpOrmModelIn} from "../../types/models/Auth/in/SignUpOrmModelIn";

const prisma: PrismaClient = new PrismaClient()

export const AuthRepository = {
    async logIn(userData : LogInRequestModel) : Promise<UserORMModelOut | null>{
        return null
    },

    async signIn(userData : SignUpOrmModelIn) : Promise<UserORMModelOut | null>{
        return null
    }
}