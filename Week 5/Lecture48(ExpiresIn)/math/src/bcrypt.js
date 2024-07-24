const bcrypt = require('bcrypt');

const encryptPassword = async(plaintextPassword)=>{
    try{
        return await bcrypt.hash(plaintextPassword,8);
    }catch(error){
        console.log(error);
        throw error;
    }
}

const checkPassword = async(plaintextPassword,encryptedPassword)=>{
    try{
        return await bcrypt.compare(plaintextPassword,encryptedPassword);

    }catch(error){
        console.log(error);
        throw error;
    }
}

module.exports={encryptPassword,checkPassword};