import jwt from 'jsonwebtoken';

export  const getJwtToken = (userId :string)=>{
     return jwt.sign({userId :userId},"pranav",{expiresIn : '1 day'})
}