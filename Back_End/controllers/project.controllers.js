const { ResourceNotFoundError } = require("../errors/common.error");
const { uploadImageCloudinary } = require("../utils/imageUploadCloudinary");
require("dotenv").config();

const addProject=async (req,res,next)=>{
    try{

        const {
            title,
            companyName,
            description
        }=req.body;
        //get logo of project   
        const logo=req.files.logo;
        console.log("logo ",logo);
    
        if(!title || !companyName || !description | !logo){
            throw new ResourceNotFoundError("Required field title,companyName,description,logo");
        }
        
        //Upload Image to Cloundinary 
        const logoFromCloudinary=await uploadImageCloudinary(logo,process.env.FOLDER_NAME);

        const project=await addProject(req.body,logoFromCloudinary.secure_url);

        return res.status(200).json({
           success:true,
           message:"Project are Created Successfully",
           project:project
        })
    }
    catch(error){
        next(error);
    }
}

module.exports={
    addProject
}