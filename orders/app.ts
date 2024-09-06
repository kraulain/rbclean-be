import express, {  NextFunction, Request , Response} from "express"
import  cookieParser from "cookie-parser" 
import path from 'path'
import logger  from "morgan";

import indexRouter  from "./src/routes/index"

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const port = process.env.PORT || 8080


app.listen(port || '', () => {
    console.log(`🚀Server is listening at port ${port}`)
}) 

module.exports = app;
