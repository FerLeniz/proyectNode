const mongoose=require('mongoose')

const itemCarouselSchema= new mongoose.Schema({
    title:{ type: "String", required: true },
    text:String,
    photo:String
})

const ItemCarousel= mongoose.model('carouselItem', itemCarouselSchema)

module.exports= ItemCarousel