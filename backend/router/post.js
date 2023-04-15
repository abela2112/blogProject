const express=require('express')
const {createPost}=require('../controller/post')
const router=express.Router()
router.get('/profile', (req,res)=>{
// const {token}=req.cookies
// const value=jwt.verify(token,secret)
res.json(req.value)

})
router.post('/create',createPost)
module.exports=router