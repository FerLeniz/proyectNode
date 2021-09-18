const mongoose=require('mongoose')

const commentSchema= new mongoose.Schema({
    // titleBar: { type: "String", required: true },
    //[{ userId:{type:mongoose.Types.ObjectId, ref:'user' }, comment: { type: String } }],
    comment:{ type: String },
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    name:String,
    age:Number
})

const Comment=mongoose.model('comment',commentSchema)
module.exports=Comment