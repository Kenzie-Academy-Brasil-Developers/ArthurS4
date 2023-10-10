import { NextFunction, Request, Response } from "express"
import { client } from "../database";
import { AppError } from "../errors/errors";

export const emailValidation = async (req: Request, res: Response, next: NextFunction) => {

    const query2 = `SELECT * FROM users WHERE email LIKE '%${req.body.email}'; `
    const data2 = await client.query(query2);

    if (data2.rows.length > 0) {
        throw new AppError('Email already registered',409)
    }

    return next()
}

