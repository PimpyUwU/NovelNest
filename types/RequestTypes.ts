import {Request} from "express";

export interface RequestWithJWT extends AllTypeRequest<any, any, any> {
    cookies: {
        jwt : string | null
    };
}
export type RequestWithURIParam<T> = Request<T>
export type RequestWithBody<T> = Request<{}, {}, T>
export type RequestWithQueryParam<T> = Request<{}, {}, {}, T>
export type AllTypeRequest<T, U, W> = Request<T, {}, U, W>