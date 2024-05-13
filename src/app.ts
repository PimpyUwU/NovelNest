import express from "express"
import {GetAuthRouter} from "./routes/AuthRouter";
import {GetLibraryRouter} from "./routes/LibraryRouter";
import cors from "cors";
const cookieParser = require("cookie-parser")

export const app : express.Express = express()

app.use(express.json())

app.use(cookieParser())

app.set("trust proxy", 1)

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    credentials : true
}));

app.use('/auth', GetAuthRouter())

app.use('/library', GetLibraryRouter())