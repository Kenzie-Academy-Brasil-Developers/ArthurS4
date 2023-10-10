import { NextFunction, Request, Response } from "express"
import { client } from "../database";
import { verify } from "jsonwebtoken";
import "dotenv/config"
import { AppError } from "../errors/errors";

export const validateToken = async (req: Request, res: Response, next: NextFunction) => {
    const authorization: string | undefined = req.headers.authorization

    if (authorization == undefined) {
        throw new AppError("Missing bearer token", 401)
    }

    const [_bearer, token] = authorization.split(" ")

    verify(token, String(process.env.SECRET_KEY), (error: any, decoded: any) => {
        if (error) {
            throw new AppError(error.message, 401)
        }

        res.locals.email = decoded.email
        res.locals.admin = decoded.admin
        res.locals.id = decoded.id
    })
    
    if (!res.locals.admin) {
        throw new AppError("Insufficient permission", 403)
    }

    return next()
}

