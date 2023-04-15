const express=require('express')
const app=express()


const cors=require('cors')
const cookieParser = require('cookie-parser')
const multer=require('multer')
const mongoose=require('mongoose')
require('express-async-errors')

//router
const Auth=require('./router/Auth')
const profile=require('./router/profile')
const post=require('./router/post')

//middleware
const errorHandler=require('./middleware/errorHandler')
const authorize=require('./middleware/authorize')
const notfound = require('./middleware/notFound')
const uploadMiddleware=multer({dest:'uploads/'})
app.use(cors({credentials:true,origin:'http://localhost:3000'}))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/api/v1',Auth)
app.use('/api/v1/user',profile)
app.use('/api/v1/post',authorize,uploadMiddleware.single('file'),post)


app.use(errorHandler)
app.use(notfound)

const start=async()=>{
    await mongoose.connect('mongodb://localhost:27017/BlogProject')
    app.listen(4000,()=>{
        console.log('server is listening on port 4000...')
    })
}
start()