const errorHandler=(err,req,res,next)=>{
if(err){
    console.log(err)
    res.status(400).send('error')
}
}
module.exports=errorHandler