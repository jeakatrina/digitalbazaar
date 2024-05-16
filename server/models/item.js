const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types


const itemSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        default:"No description."
    },
    photo:{ //may be changed to primaryPhoto if commisions are implemented, as they could several photos.
        type:String,
        default:"No photo." //to be changed to required
    },
    artist:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Item",itemSchema)
