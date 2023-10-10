import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
    statusCode: number

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode
    }
}

export const handleErros = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message })
    }

    console.log(error)
    return res.status(500).json('Internal server error.')
}
