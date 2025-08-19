// 1. npm init se package.json aayega
// 2. npm i express se package-lock.json aur node_modules folder aayega

const express = require('express')
// console.log(express)
const app = express()
const port = 3000
const web = require('./routes/web')
const connectDB = require('./db/connectDB')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
require("dotenv").config();

//token get cookie
app.use(cookieParser())


//image upload
app.use(fileUpload({
    useTempFiles : true,
}));


// connect db
connectDB()
app.use(express.json())




app.use('/api',web)


app.listen(process.env.PORT,console.log("server stsrt at localhost:3000"))  // this error comes -> " Cannot GET / "  so we make next line