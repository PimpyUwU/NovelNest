import express from "express"
import {GetAuthRouter} from "./routes/AuthRouter";
import bodyParser from "body-parser";

export const app : express.Express = express()

app.use(bodyParser.raw({
    type : 'image/png',
    limit : '10mb'
}))

app.use(express.json())

app.use('/library', GetAuthRouter)
