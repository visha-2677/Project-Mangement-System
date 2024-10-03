const { AuthorizationError, AuthenticationError, MongoError, InvalidRequestError, ResourceNotFoundError, ServerError} = require("../errors/common.error")


const errorHandler=(err,req,res,next)=>{
    if(
        err instanceof AuthorizationError ||
        err instanceof AuthenticationError ||
        err instanceof MongoError ||
        err instanceof InvalidRequestError ||
        err instanceof ResourceNotFoundError
    ){
        const error= err?.toJSON();
        return res.status(error.statusCode || 400).json({
            success:false,
            error:{type:error.type,message:error.message},
            data:{}    
        })
    }
    else{
        const err=new ServerError();
        return res.status(err.statusCode || 400).json({
            success:false,
            error:{type:err.type,message:err.message},
            data:{}
        })
    }
}

module.exports={errorHandler}