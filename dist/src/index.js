"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const port = 1488;
app_1.app.listen(port, () => {
    console.log(`Server started at port : ${port}`);
});
