import { Request, Response } from "express"
import { ICourses } from "../interfaces"
import { devServices, projectsServices } from "../services"


const createCourses = async (req: Request, res: Response): Promise<Response> => {
    const dev: ICourses = await projectsServices.createCourses(req.body)
    return res.status(201).json(dev)
}

const getAllCourses = async (req: Request, res: Response): Promise<Response> => {
    const dev = await projectsServices.getAllCourses()
    return res.status(200).json(dev)
}

const addMatricula = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params

    const dev = await projectsServices.addMatricula(courseId, userId)
    return res.status(201).json(dev)
}

const patchMatricula = async (req: Request, res: Response): Promise<Response> => {
    const { courseId, userId } = req.params

    const dev = await projectsServices.patchMatricula(courseId, userId)
    return res.status(204).json(dev)
}

const idMatriculas = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params

    const dev = await projectsServices.idMatriculas(id)
    return res.status(200).json(dev)
}





export default {  createCourses, getAllCourses, addMatricula, patchMatricula, idMatriculas }