import express from "express"
import jwt from "jsonwebtoken"
import {Prisma} from "../../prisma/index"

declare module 'express-serve-static-core' {
  interface Request {
    user?: any; 
  }
}

export const isAuthenticated = async(req:express.Request,res:express.Response,next:express.NextFunction)=>{

    const reqToken = req.cookies.token
    if (!reqToken) {
        return res.status(401).json({message : "Please Login to access this features"})
      }
    
      const decodedData = jwt.verify(reqToken, "pranav") as { userId: string };

  

    const user = await Prisma.user.findUnique({
        where : {
            id : decodedData.userId
        }
      })

      if(!user){
        return res.status(401).json({message:"You must be loggedIn to use this feature"})
      }

      req.user = user;
    
      next();
}