import {LogInRequestModel} from "../../types/models/Auth/in/LogInRequestModel";
import {UserViewModel} from "../../types/models/Auth/out/UserViewModel";
import {SignUpRequestModel} from "../../types/models/Auth/in/SignUpRequestModel";

export const AuthService = {
    async logIn(userData : LogInRequestModel) : Promise<UserViewModel | null>{
        const user : UserViewModel

        return user
    },

    async signUp(userData : SignUpRequestModel) : Promise<UserViewModel | null>{

    }
}