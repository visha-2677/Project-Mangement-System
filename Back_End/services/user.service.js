const { MongoError, InvalidRequestError } = require("../errors/common.error");
const User = require("../models/user.model")


const addUserService=async (email,password)=>{
    try{
        let findUser=await User.findOne({email});
        if(findUser){
            throw new InvalidRequestError("User Already Registered")
        }
        return await User.create({
            email,
            password
        })
    }
    catch(error){
        throw error instanceof InvalidRequestError ? error: new MongoError(error);
    }
}

const findUserService=async (email)=>{
    try{
        return await User.findOne({email});
    }
    catch(error){
        throw new MongoError(error);
    }
}

module.exports={
    findUserService,
    addUserService
}