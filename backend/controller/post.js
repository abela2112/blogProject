const fs=require('fs')
const Post=require('../models/post')

const getPost=async(req,res)=>{
    const post=await Post.find({})
    .populate('author',['userName'])
    .sort({createdAt:-1})
    .limit(20)
    
    res.json(post)
}
const createPost=async (req,res)=>{
    const {file:{originalname,path},body:{title,content,summary},userID}=req
    // const value=jwt.verify(token,secret)
    // const {userID}=value
    const ext=originalname.split('.')[1]
    const newpath=path+'.'+ext
    fs.renameSync(path,newpath)

    const postDOc=await Post.create({title,content,summary,Cover:newpath,author:userID})
    res.json(postDOc)
}
const getSinglePost=async(req,res)=>{
    const {id}=req.params
    const post=await Post.findById(id).populate('author',['userName'])
    
    res.json(post)
}

const updatePost=async(req,res)=>{
    const {id}=req.params
    let newPath=''
    const {title,summary,content}=req.body
    if(req.file){
       const {
        file:{originalname,path}}=req
       const ext=originalname.split('.')[1]
        newPath=path+'.'+ext
        fs.renameSync(path,newPath)
    }
    
    const post=await Post.findById({_id:id})
    if(!post) throw new Error('not file found')
    
    await Post.updateOne({_id:id},{
        title,
        summary,
        content,
        Cover:newPath ?newPath:post.Cover
    })
    
    
    res.json(post)
}
const deletePost=async(req,res)=>{
    const {id}=req.params
    const post=await Post.deleteOne({_id:id})
    res.json(post)
}
module.exports={getPost,createPost,getSinglePost,updatePost,deletePost}