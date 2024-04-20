import express from "express"
import {GetAuthRouter} from "./routes/AuthRouter";
import {GetLibraryRouter} from "./routes/LibraryRouter";

export const app : express.Express = express()

app.use(express.json())

app.use('/auth', GetAuthRouter())

app.use('/library', GetLibraryRouter())