const User=require('../models/User');

//add new user
exports.addNewUser=async(req,res)=>{
    try{
        const {name,email,age,password} = req.body;
        const user = new User(name,email,age,password);
        await user.save();
        res.status(200).send(user);

    }catch(error){
        console.log(error);
        return res.status(500).send({message: "SignUp failed"});
    }
}


//login
exports.loginUser=async(req,res)=>{
    try{
        const {email,password} = req.body;
        const user=await User.findByEmailAndPasswordForAuth(email,password);
        console.info(`User with email:${email} successfully login!`);
        return res.status(200).send(user);

    }catch(error){
        console.log(error);
        return res.status(500).send({message: "Login failed"});
    }
}