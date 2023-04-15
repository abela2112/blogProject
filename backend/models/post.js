const {Schema,model, SchemaType}=require('mongoose')
const postSchema=new Schema({
    title:String,
    summary:String,
    content:String,
    Cover:String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'user',
        required:true

    }
},{timestamps:true})

module.exports=model('post',postSchema)