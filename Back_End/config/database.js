const mongoose=require("mongoose");
require("dotenv").config();

exports.connect=()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log("------------------ MONGODB DATABASE CONNECT SUCCESSFULLY ------------------------------")
    })
    .catch((error)=>{
        console.log("----------------- DB IS NOT CONNECTED !! ----------------")
        console.log(error);
        console.error(error);
        process.exit(1);
    })
}