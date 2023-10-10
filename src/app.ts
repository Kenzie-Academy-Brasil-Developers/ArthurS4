import express, { Application, json } from 'express'
import "dotenv/config"
import "express-async-errors"
import { devRouter } from './routes/users.routes'
import { projectsRouter } from './routes/courses.routes'
import { handleErros } from './errors/errors'


const app: Application = express()
app.use(json())

app.use("/", devRouter)


app.use("/courses/", projectsRouter)
app.use(handleErros)

export default app
