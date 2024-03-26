import express from "express"
import {GetLibraryRouter} from "./routes/LibraryRouter";

export const app : express.Express = express()

app.use(express.json())

app.use('/library', GetLibraryRouter())
