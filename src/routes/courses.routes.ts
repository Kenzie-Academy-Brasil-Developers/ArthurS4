
import { Router } from "express";
import { projectsControllers } from "../controllers";
import { validateToken } from "../middlewares/validateToken";
import { coursesSchema } from "../schemas/coursesReturn";
import { validateBody } from "../middlewares/validateBody";
import { validateCourse } from "../middlewares/validateCourse";
import { validateCUser } from "../middlewares/validateCUser";

export const projectsRouter = Router()

projectsRouter.post("/", validateToken, validateBody(coursesSchema), projectsControllers.createCourses)

projectsRouter.get("/", projectsControllers.getAllCourses)

projectsRouter.post("/:courseId/users/:userId", validateCourse, validateCUser, validateToken, projectsControllers.addMatricula)

projectsRouter.delete("/:courseId/users/:userId", validateCourse, validateCUser, validateToken, projectsControllers.patchMatricula)

projectsRouter.get("/:id/users", validateToken, projectsControllers.idMatriculas)

