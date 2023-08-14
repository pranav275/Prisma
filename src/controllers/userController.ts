import {Prisma} from "../../prisma/index"
import express from "express"
import { cookieToken } from "../utils/cookieToken";
import { hash } from "bcryptjs";
import { compare } from "bcryptjs";


export const signUp = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const {name,email,password} = req.body;

    if(!name || !email || !password){
        return res.status(400).json({message:"Please provide all fileds"})
    }

    const existingUser = await Prisma.user.findUnique({
        where : {
            email : email
        }
    })

    if(existingUser){
        return res.status(400).json({message:"User already exists"})
    }

    try{

        const user = await Prisma.user.create({
            data :{
                name :name,
                email :email,
                password : await hash(password,12)
            }
        })

        cookieToken(user,res);

    }catch(err){
        console.log(err);
        res.status(404).json({message : "Server error"})
    }


}

export const logIn = async (req:express.Request,res:express.Response,next:express.NextFunction)=>{

    try{
        const {email,password} = req.body;

        const currUser = await Prisma.user.findUnique({
            where : {
                email : email
            }
        })
    
        if(!currUser){
            res.status(404).json({message:"User not found"});
        }
    
        const checkPassword = await compare(password,currUser.password);
        
        if(!checkPassword){
            return res.status(400).json({message : "Email or password is wrong"})
        }
    
        cookieToken(currUser,res);
    }catch(err){
        console.log(err);
        return res.status(404).json({message:"Servor error"})       
    }







}
