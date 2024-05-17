import {NextFunction, Request, Response} from "express";
import {SECRET_KEY} from "../../env";
import * as jwt from "jsonwebtoken"
import {AllTypeRequest} from "../../types/RequestTypes";

export const AuthMiddleware = {
    async requireAuthorization(req : Request, res : Response, next : NextFunction){
        const token : string | null  = req.cookies.jwt

        if(token){
            jwt.verify(token, SECRET_KEY,(error) => {
                if(error){
                    res.redirect("/auth/log-in")
                }
                else
                    next()
            })
        }
        else res.redirect("/admin/log-in")
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
        }
        next()
    }
}
