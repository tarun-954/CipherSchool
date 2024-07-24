const jwt=require('jsonwebtoken');
JWT_SECRET_KEY="abcdefgh";

const generateToken=(payload) =>{
    return jwt.sign(payload,JWT_SECRET_KEY);
}

const verifyTooken=(token) =>{
    try{
        const payload=jwt.verify(token,JWT_SECRET_KEY,{ExpiresIn:"2h"});
        return {isValidToken:true,payload:payload};
        
    }catch(error){
        console.log(error);
        return {isValidToken:false,payload:undefined};
    }
}

module.exports={generateToken,verifyTooken};