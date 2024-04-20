import {Request, Response} from "express";
import {RequestWithBody, RequestWithJWT} from "../../types/RequestTypes";
import {LogInRequestModel} from "../../types/models/Auth/in/LogInRequestModel";
import {UserViewModel} from "../../types/models/Auth/out/UserViewModel";
import {AuthService} from "../services/AuthService";
import HTTP_CODES from "../HTTP_CODES";
import jwt, {JwtPayload} from "jsonwebtoken"
import {SECRET_KEY} from "../../env";
import {SignUpRequestModel} from "../../types/models/Auth/in/SignUpRequestModel";
import {UniversityViewModel} from "../../types/models/Auth/out/UniversityViewModel";

export const AuthController = {
    async logInGet(req : Request, res : Response){
        res.status(200).send()
    },

    async logInPost(req : RequestWithBody<LogInRequestModel>, res : Response<UserViewModel>){
        const authData : LogInRequestModel = req.body

        const user : UserViewModel | null = await AuthService.logIn(authData)

        if(!user){
            res.status(HTTP_CODES.UNAUTHORIZED_401).send()
            return
        }

        const token : string = await createJwt(user.userId, user.university_id, user.is_verified)

        //successfully logged-in user
        res.cookie('jwt', token, {
            httpOnly : true,
            maxAge : 3 * 24 * 60 * 60 * 1000
        })
        res.status(HTTP_CODES.OK_200).json(user).send()
    },

    async signInGet(req : Request, res : Response<UniversityViewModel[]>){
        const universities : UniversityViewModel[] = await AuthService.getAllUni()

        res.status(HTTP_CODES.OK_200).send(universities)
    },

    async signInPost(req : RequestWithBody<SignUpRequestModel>, res : Response<UserViewModel>){
        const authData : SignUpRequestModel = req.body
        authData.university_id = Number(authData.university_id)

        const user : UserViewModel | null = await AuthService.signUp(authData)

        if(!user){
            res.status(HTTP_CODES.UNAUTHORIZED_401).send()
            return
        }

        const token : string = await createJwt(user.userId, user.university_id, user.is_verified)
        //successfully logged-in user
        res.cookie('jwt', token, {
            httpOnly : true,
            maxAge : 3 * 24 * 60 * 60 * 1000
        })
        res.status(HTTP_CODES.OK_200).json(user).send()
    },

    async logOut(req : RequestWithJWT, res : Response){
        res.cookie('jwt', '', {
            maxAge : 1,
            httpOnly : true
        }).redirect('/')
    }
}

const createJwt = async (userId : number, universityId : number, isVerified : boolean) : Promise<string> => {
    return jwt.sign({userId : userId, universityId : universityId, isVerified : isVerified}, SECRET_KEY, {
        expiresIn : 3 * 24 * 60 * 60
    })
}