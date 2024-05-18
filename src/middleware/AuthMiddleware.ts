import {NextFunction, Request, Response} from "express";
import {SECRET_KEY} from "../../env";
import * as jwt from "jsonwebtoken"
import {AllTypeRequest} from "../../types/RequestTypes";
import HTTP_CODES from "../HTTP_CODES";

export const AuthMiddleware = {
    async requireAuthorization(req : Request, res : Response, next : NextFunction){
        const token : string | null  = req.cookies.jwt

        if(token){
            jwt.verify(token, SECRET_KEY,(error) => {
                if(error){
                    res.status(HTTP_CODES.UNAUTHORIZED_401).send()
                }
                else
                    next()
            })
        }
        else res.status(HTTP_CODES.UNAUTHORIZED_401).send()
    },

    async checkUserRoleAndId(req : AllTypeRequest<any, any, any>, res : Response, next : NextFunction){
        const token : string | null = req.cookies.jwt

        if(token){
            const payload = <jwt.UserJwtPayload>jwt.verify(token, SECRET_KEY);
            res.locals = {
                userId : payload.userId,
                universityId : payload.universityId,
                isVerified : payload.isVerified
            }

            next()
        } else res.status(HTTP_CODES.UNAUTHORIZED_401).send()
    }
}
