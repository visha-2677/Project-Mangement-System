const jwt=require('jsonwebtoken');
const md5=require('md5');
require("dotenv").config();
const { ResourceNotFoundError, InvalidRequestError, AuthenticationError} = require('../errors/common.error');
const { addUserService, findUserService } = require('../services/user.service');

const signUp=async (req,res,next)=>{
    try{

        const {email,password}=req.body;

        if(!email || !password){
            throw new ResourceNotFoundError("Required email and password")
        }

        // hashed password using md5
        const hashedPassword=md5(password);

        const userRegister=await addUserService(email,hashedPassword);
        
        // return res
        return res.status(200).json({
            success:true,
            message:'User are successfully Registered',
            User:userRegister,
        });
    }
    catch(error){
        next(error);
        // return res.status(500).json({
        //     success:false,
        //     message:"User cannot be registered, Please try again",
        // });
    }

}

const signIn=async (req,res,next)=>{
    try{

        const {email,password}=req.body;

        if(!email || !password){
            throw new ResourceNotFoundError("Required email and password")
        }
        // find user
        const user=await findUserService(email);

        if(!user){
            throw new InvalidRequestError("User are not Registered")
        }
        if(user.password === md5(password)){
            const payload={
                email:user.email,
                userId:user._id
            };
    
            const token=jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:'24h',
            })
    
            user.token=token;
            user.password=undefined;

            // Why Cookie ? => Because of enhancing the user's experience on the web  and Cookies are primarily used for session management
            const options={
                expires:new Date(Date.now() + 3*24*60*60*100),
                httpOnly:true,
                secure:true
            }
            res.cookie("token",token,options).status(200).json({
                success:true,
                token,
                user,
                message:"Logged In Successfully",
            })
        }
        else{
            throw new AuthenticationError("Invalid Password")
        }
    }
    catch(error){
        next(error);
        // return res.status(500).json({
        //     success:false,
        //     message:"Login is failure try again",
        // })
    }
}


module.exports={
    signUp,
    signIn
}