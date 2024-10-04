const { ResourceNotFoundError } = require("../errors/common.error");
const { addProjectService, findProjectByIdService, updateProjectByIdService, getAllProjectsService } = require("../services/project.service");
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
    
        if(!title || !companyName || !description | !logo){
            throw new ResourceNotFoundError("Required field title,companyName,description,logo");
        }
        
        //Upload Image to Cloundinary 
        const logoFromCloudinary=await uploadImageCloudinary(logo,process.env.FOLDER_NAME);

        const project=await addProjectService(req.body,logoFromCloudinary.secure_url);

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

const editProject=async (req,res,next)=>{
    try{    
        const { id }=req.params;
        const {
            title,
            companyName,
            description
        }=req.body;
        const logo=req.files.logo;

        const project=await findProjectByIdService(id,req.body);

        if(!project){
            throw new ResourceNotFoundError("Project Not Found");
        }

        project.title=title || project.title;
        project.companyName=companyName || project.companyName;
        project.description=description || project.description;
        
        if(logo){
            const logoUploadCloudinary=await uploadImageCloudinary(logo,process.env.FOLDER_NAME);
            project.logo=logoUploadCloudinary.secure_url;
        }
        const updateProject=await updateProjectByIdService(id,project);

        if(updateProject){
            return res.status(200).json({
                success:true,
                message:"Project Update Successfully",
                project:updateProject
            })
        }
    }
    catch(error){
        next(error);
    }
}

const getAllProject=async (req,res,next)=>{
    try{
        const allProjects=await getAllProjectsService();
        if(allProjects){
            return res.status(200).json({
                success:true,
                message:"All Project Fetched Successfully",
                allProjects:allProjects
            })
        }
    }   
    catch(error){
        next(error);
    }
}

module.exports={
    addProject,
    editProject,
    getAllProject
}