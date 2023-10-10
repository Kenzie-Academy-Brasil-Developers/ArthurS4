import { Request, Response } from "express"
import {  ILogin, IUsers, IUsersCreate } from "../interfaces"
import { devServices } from "../services"

const createUsers = async (req: Request, res: Response): Promise<Response> => {
    const dev: IUsersCreate = await devServices.createUsers(req.body)
    return res.status(201).json(dev)
}

const login = async (req: Request, res: Response): Promise<Response> => {
    const dev = await devServices.login(req.body)
    return res.status(200).json(dev)
}

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
    const dev = await devServices.getAllUsers(res.locals)
    return res.status(200).json(dev)
}

const coursesIdUser = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const dev = await devServices.coursesIdUser(id)
    return res.status(200).json(dev)
}



export default {  createUsers, login, getAllUsers, coursesIdUser }