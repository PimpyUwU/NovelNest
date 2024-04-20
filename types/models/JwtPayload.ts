import jwt from "jsonwebtoken"

declare module "jsonwebtoken" {
    export interface UserJwtPayload extends jwt.JwtPayload{
        userId : number
        universityId : number
        isVerified : boolean
    }
}