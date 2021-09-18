const mongoose=require('mongoose')

const userSchema= new mongoose.Schema({
    name:{type:'String',required:true},
    lastname:String,
    age:Number,
    email:String,
    password:{type:'String',required:true}
})

const User=mongoose.model('user',userSchema)

module.exports = User