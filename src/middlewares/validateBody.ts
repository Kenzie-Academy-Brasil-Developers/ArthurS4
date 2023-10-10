import { NextFunction, Request, Response } from "express"
import { ZodTypeAny, ZodError } from 'zod'

export const validateBody = (schema: ZodTypeAny) => 
(req: Request, res: Response, next: NextFunction): Response | void => {
    try {
        const validated = schema.parse(req.body)
        req.body = validated

        return next()
    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json( error.flatten().fieldErrors )
        }
        console.log(error)
        return res.status(500).json({ message: 'Internal Server Error' })
    }

}
