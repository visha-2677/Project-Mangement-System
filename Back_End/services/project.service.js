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

module.exports={
    addProjectService
}