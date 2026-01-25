const mongoose=require("mongoose");

const userschema=mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    displayName:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("User",userschema);