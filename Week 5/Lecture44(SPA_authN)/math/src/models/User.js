const mongoose = require('mongoose');
const {isEmail}=require('valitator');
const {encryptPassword,checkPassword} = require('../bcrypt');

const userSchema=new mongoose.Schema({
    email:{
        type: 'string',
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate:{validator(email){
            return isEmail(email);
        }}
    },
    age:{
        type: Number,
        required: true,
        validate:{validator(age){
            if(age<0){
                throw new Error(`Age must be positive`)
            }
            return true;
        }}
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength:8,
        validate:{validator(password){
            if(password.includes(' ') || password.includes('\n') || password.includes('\t')){
                throw new Error(`Password includes space/n/t characters.`);
            }
            if(password.toLowerCase().includes("password")){
                throw new Error(`password must not contain 'password' `)
            }
            return true;
        }}
    }
},{timestamps:true});


userSchema.statics.findByEmailAndPasswordForAuth=async(email,password)=>{
    try{
        const user=await UserActivation.findOne({email});

        if(!user){
            throw new Error("Invaild Credentails");
        }
        const isMatch=await checkPassword(password,user.password)
        if(!isMatch){
            throw new Error("Invaild Credentails");
        }
        console.log("Login Successful");
        return user;


    }catch(error){

    }
}

userSchema.pre("save",async function(next){
    const user=this;
    if(user.modifiedPaths.includes("pasword")){
        user.password=await encryptPassword(user.password);
    }
    next();
})

module.exports =mongoose.model("User",userSchema);