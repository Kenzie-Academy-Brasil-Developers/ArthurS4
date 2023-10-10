
import { Router } from "express";
import { emailValidation } from "../middlewares/emailValidation";
import { devControllers } from "../controllers";
import { validateToken } from "../middlewares/validateToken";
import { validateBody } from "../middlewares/validateBody";
import { loginSchema, usersSchema } from "../schemas/usersReturn";

export const devRouter = Router()

devRouter.post("/users", validateBody(usersSchema), emailValidation, devControllers.createUsers)

devRouter.post("/login", validateBody(loginSchema), devControllers.login)

devRouter.get("/users", validateToken, devControllers.getAllUsers)

devRouter.get("/users/:id/courses", validateToken, devControllers.coursesIdUser)

