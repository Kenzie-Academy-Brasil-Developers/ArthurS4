import { NextFunction, Request, Response } from "express"
import { client } from "../database";
import { AppError } from "../errors/errors";

export const validateCourse = async (req: Request, res: Response, next: NextFunction) => {

    const query2 = `SELECT * FROM courses WHERE id = ${req.params.courseId} ; `

    const data2 = await client.query(query2);
    if (data2.rows.length == 0) {
        throw new AppError('User/course not found', 404)
    }

    return next()
}

