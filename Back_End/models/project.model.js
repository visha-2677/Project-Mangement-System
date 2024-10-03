const mongoose=require("mongoose");

const projectSchema=new mongoose.Schema({
    logo:{
        type:String,
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    companyName:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true,
    },
},{
    timestamps:true,
    collection:"project"
})

module.exports=mongoose.model("Project",projectSchema);