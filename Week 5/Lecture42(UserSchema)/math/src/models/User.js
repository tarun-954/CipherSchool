const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type: 'string',
        trim: true,
        lowercase: true,
        unique: true,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minLength:8,
    }
},{timestamps:true});

module.exports =mongoose.model("User",userSchema);