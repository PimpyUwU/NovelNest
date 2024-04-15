import express from "express"
import {GetAuthRouter} from "./routes/AuthRouter";

export const app : express.Express = express()

app.use(express.json())


app.use('/auth', GetAuthRouter())
