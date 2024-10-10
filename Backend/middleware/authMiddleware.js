import jwt from 'jsonwebtoken'
import AppError from '../utils/error.js'
const isLoggedIn = async (req,res,next)=>{
  
    const {token}=req.cookies
    console.log('fjdjfdj',req.cookies);
    
    if(!token){
        return next(new AppError('Unauthenticated , please login again',405))
    }
    const userDetails=await jwt.verify(token,process.env.JWT_SECRET)
    if (!userDetails) {
        return next(new AppError("Unauthorized, please login to continue", 401));
      }
    console.log('detail',userDetails);
    
    req.user=userDetails
    next()
}

const authorisedRoles=(...roles)=>async (req,res,next)=>{
    
    const currentUser=req.user.role;
    
    if(!roles.includes(currentUser)){
        return next(
            new AppError('Do not have permission to access these route ',403)
        )
    }
    next()
}


export{
    isLoggedIn,
    authorisedRoles
}