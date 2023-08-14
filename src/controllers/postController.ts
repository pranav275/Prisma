import {Prisma} from "../../prisma/index"
import express from "express"

export const getMyNotes = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    console.log('I am in get notes')
    try{
        const notes = await Prisma.post.findMany({
            where :{
                authorId : req.user.id
            }
         });
         return res.status(200).json(notes);
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Server error"})
    }
   
}

export const addNotes = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{
    const {title, description}= req.body;
    try{
       const newPost = await Prisma.post.create({
        data :{
            title,
            description,
            authorId : req.user.id
        }
       })
       return res.status(200).json(newPost);
    }catch(err){
        console.log(err);
        return res.status(400).json({message:"Server error"})
    }
   
}