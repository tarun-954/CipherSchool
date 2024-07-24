const {verifyToken}=require('../jwt');
const User=require('../models/User');

const authMiddleware =async(req,res,next)=>{
    try{
        const {authorization}=req.headers;
        if(!authorization) {
            return res.status(400).json({
                success: false,
                message: 'Invalid authorization,please send token'
            })
        }
        const token=authorization.substring(7);
        const {isValidToken,payload}=verifyToken(token);
        if(isValidToken){
            console.log("Token is valid");
            const user=await User.findOne({_id:payload._id});
            req.token=token;
            req.user=user;
            next();
        }
        else{
            console.warn("Token is Invalid");
            return res.status(403).json({message:"Please use a valid token"})
        }


    }catch(error){

    }
}