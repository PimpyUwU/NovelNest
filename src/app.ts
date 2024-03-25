import express from "express"

export const app : express.Express = express()

app.use(express.json())

app.use('/', (req, res) => {
    res.send('hello world')
})
