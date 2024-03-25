import {app} from "./app";

const port : number = 1488

app.listen(port, () => {
    console.log(`Server started at port : ${port}`)
})