const mongoose=require('mongoose')

const commentCerveSchema= new mongoose.Schema({
    content:{ type: "String", required: true },
})

const CommentCervelar=mongoose.model('commentCerve',commentCerveSchema)
module.exports=CommentCervelar