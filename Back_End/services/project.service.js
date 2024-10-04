const { MongoError } = require("../errors/common.error")
const projectModel = require("../models/project.model")


const addProjectService=async (body,logo)=>{
    try{
        return await projectModel.create({
            title:body.title,
            companyName:body.companyName,
            description:body.description,
            logo:logo,
        })
    }
    catch(error){
        throw new MongoError(error);
    }
}

const findProjectByIdService=async (id)=>{
    try{
        return await projectModel.findById(id);
    }
    catch(error){
        throw new MongoError(error);
    }
}

const updateProjectByIdService=async (id,project)=>{
    try{
        return await projectModel.findByIdAndUpdate(id,project,{new:true});
    }
    catch(error){
        throw new MongoError(error);
    }
}

const getAllProjectsService=async ()=>{
    try{
        return await projectModel.find();
    }
    catch(error){
        throw new MongoError(error);
    }
}

module.exports={
    addProjectService,
    findProjectByIdService,
    updateProjectByIdService,
    getAllProjectsService
}