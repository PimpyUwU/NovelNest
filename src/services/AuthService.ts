import {LogInRequestModel} from "../../types/models/Auth/in/LogInRequestModel";
import {UserViewModel} from "../../types/models/Auth/out/UserViewModel";
import {SignUpRequestModel} from "../../types/models/Auth/in/SignUpRequestModel";
import {AuthRepository} from "../repositories/AuthRepository";
import {UserORMModelOut} from "../../types/models/Auth/out/UserORMModelOut";
import {UniversityViewModel} from "../../types/models/Auth/out/UniversityViewModel";

export const AuthService = {
    async logIn(userData : LogInRequestModel) : Promise<UserViewModel | null>{
        const user : UserORMModelOut | null = await AuthRepository.logIn(userData)

        if(!user){
            return null
        }
        return {
            userId : user.id,
            university_id : user.university_id,
            name : `${user.first_name} ${user.last_name}`,
            isic : user.isic,
            is_verified : user.is_verified
        }
    },

    async signUp(userData : SignUpRequestModel) : Promise<UserViewModel | null>{
        const user : UserORMModelOut | null = await AuthRepository.signIn(userData)

        if(!user){
            return null
        }
        return {
            userId : user.id,
            university_id : user.university_id,
            name : `${user.first_name} ${user.last_name}`,
            isic : user.isic,
            is_verified : user.is_verified
        }
    },

    async getAllUni() : Promise<UniversityViewModel[]>{
        return AuthRepository.getAllUni()
    }

}