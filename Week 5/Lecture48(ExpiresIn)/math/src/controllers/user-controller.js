const User = require('../models/User');

// Add new user
exports.addNewUser = async (req, res) => {
    try {
        const { name, email, age, password } = req.body;
        const user = new User({ name, email, age, password });
        await user.save();
        res.status(200).send({
            success:true,
            message:"New User registerd successfully",
            User:user
        });
    } catch (error) {
        console.log("Error in addNewUser controller: " + error.message);
        return res.status(500).send({ 
            success:false,
            message: "SignUp failed" 
        });
    }
}

// Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmailAndPasswordForAuth(email, password);
        const token = await user.generateToken();
        console.info(`User with email: ${email} successfully login!`);
        return res.status(200).send({ 
            message: `User login with email: ${email} successfull`,
            user, token 
        });
    } catch (error) {
        console.log("Error in loginUser controller: " + error.message);
        return res.status(500).send({ message: "Login failed" });
    }
}

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { user } = req;
        const deleteResult = await User.deleteOne({ _id: user._id });
        if (!deleteResult.deletedCount) {
            console.log(`Delete failed! User id ${user._id } was not found.`);
            return res.status(400).json({
                success: false,
                message: `Delete failed! User id ${user._id } was not found.`
            });
        }
        console.info("User Delete successful");
        return res.status(200).json({
            success: true,
            message: "User delete successful"
        });
    } catch (error) {
        console.log("Error in deleteUser controller: " + error.message);
        return res.status(500).send({ message: "User Deletion failed" });
    }
}
