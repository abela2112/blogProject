const jwt=require('jsonwebtoken')
const user = require('../models/user')
const secret='nvkdfnknvkfdnknvufbfif'
const authorize=(req,res,next)=>{
    const {token}=req.cookies
    const value=jwt.verify(token,secret)
    if(!value){
        throw new Error('unauthorized')
    }
    const {userName,userID}=value
    req.userName=userName
    req.userID=userID
    req.value=value

    next()

}
module.exports=authorize