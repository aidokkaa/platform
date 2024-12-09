import jwt from 'jsonwebtoken';
import { Express, NextFunction } from "express";
import { Request,Response } from "express";
const JWT_SECRET = process.env.JWT_SECRET || "JWT_SECRET"
export const verifyToken = (req:Request,res:Response,next:NextFunction)=>{
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(403).json({error:'No token provided!'})
    }
//     jwt.verify(token,JWT_SECRET,(err,decoded)=>{
//         if(err){
//          return res.status(401).json({ error: 'Invalid or expired token' });
//         }
//         req.user = decoded;
//         next();
//     })
// }
// export const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
//     if (req.user.role !== 'admin') {
//         return res.status(403).json({ error: 'Only admins can do it!' });
//     }
//     next();
// };
}