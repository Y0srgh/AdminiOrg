import jwt from 'jsonwebtoken'
import { JWTSECRETKEY, ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "./../config/config.js";

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization 

    console.log(authHeader);

  if(!authHeader?.startsWith('Bearer ')){
    return res.status(401).json({message: 'Unautorized'})
  }

  const token = authHeader.split(' ')[1]

  jwt.verify(
    token,
    ACCESS_TOKEN_SECRET,
    (err, decoded)=>{
        if(err) return res.status(403).json({message: 'Forbidden'})
        req.email = decoded.UserInfo.email;
        req.role = decoded.UserInfo.role;
        req.department = decoded.UserInfo.department;
        next();
    }
  )
}
