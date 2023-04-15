const {Schema,model}=require('mongoose')
const bcryptjs=require('bcryptjs')
const UserSchema=new Schema({
     userName:{
        type:String,
        required:true,
        min:4,
        unique:true
     },
     password:{
        type:String,
        required:true,
        min:8

     }
})
UserSchema.pre('save',async function(){
    const salt=await bcryptjs.genSalt(10)
    this.password=await bcryptjs.hash(this.password,salt)
})
UserSchema.methods.comparePassword= async function(password){
    const isPasswordMatch=await bcryptjs.compare(password,this.password)
    return isPasswordMatch;
}
module.exports=model('user',UserSchema)