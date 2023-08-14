import { getJwtToken } from "../helpers/getJwtToken";
import express from "express"

export const cookieToken = (user:any,res:express.Response)=>{
         const token = getJwtToken(user.id);
         const options = {
            expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly : true
         }

         res.status(200).cookie('token',token,options).json({success : true,user,token})
        
}