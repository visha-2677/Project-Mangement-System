const mongoose=require("mongoose");
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
},{
    timestamps: true,
    collection: "users"     
})

module.exports=mongoose.model("User",userSchema);