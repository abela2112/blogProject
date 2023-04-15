const express=require('express')
const router=express.Router()
const multer=require('multer')
// const authorize=require('./middleware/authorize')
const uploadMiddleware=multer({dest:'uploads/'})
const {getPost,getSinglePost,updatePost,deletePost}=require('../controller/post')


router.post('/logout',(req,res)=>{
    res.cookie('token','').json('ok')
})
router.get('/post',getPost)
router.get('/post/:id',getSinglePost)
router.delete('/post/:id',deletePost)
router.put('/post/:id',uploadMiddleware.single('file'),updatePost)
module.exports=router