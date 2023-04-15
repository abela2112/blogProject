const User=require('../models/user')
const secret='nvkdfnknvkfdnknvufbfif'
const jwt=require('jsonwebtoken')

const login=async(req,res)=>{
    const {userName,password}=req.body
    if(!userName || !password) throw Error('please provide valide email')

    const user=await User.findOne({userName})
    //console.log(user)
    if (!user) throw Error('not found')
    const passMatch=user.comparePassword(password)
    if (passMatch){
        const token=jwt.sign({userName:user.userName,userID:user._id},secret)
        res.cookie('token',token).json({userName,userID:user._id})
    }
    else{
        res.status(400).send('not found')
    }
    
}

const register=async (req,res)=>{
     const {userName,password}=req.body
     console.log(req.body)
     const user=await User.create({userName,password})
    res.json({
 user})
}

module.exports={
    login,register
}