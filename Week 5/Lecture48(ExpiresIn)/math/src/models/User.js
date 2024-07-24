const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { encryptPassword, checkPassword } = require('../bcrypt');
const { generateToken } = require('../jwt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        validate: {
            validator: isEmail,
            message: 'Invalid email address'
        }
    },
    age: {
        type:Number,
        required: true,
        validate: {
            validator(age) {
                if (age < 0) {
                    throw new Error('Age must be positive');
                }
                return true;
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate: {
            validator(password) {
                if (password.includes(' ') || password.includes('\n') || password.includes('\t')) {
                    throw new Error('Password includes space/n/t characters.');
                }
                if (password.toLowerCase().includes('password')) {
                    throw new Error("Password must not contain 'password'");
                }
                return true;
            }
        }
    }
}, { timestamps: true });

userSchema.statics.findByEmailAndPasswordForAuth = async function(email, password) {
    try {
        const user = await this.findOne({ email });

        if (!user) {
            throw new Error('Invalid email Credentials');
        }
        const isMatch = await checkPassword(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid password Credentials');
        }
        console.log('Login Successful');
        return user;
    } catch (error) {
        throw new Error(error.message);
    }
};

userSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            user.password = await encryptPassword(user.password);
        } catch (error) {
            return next(error);
        }
    }
    next();
});

userSchema.methods.generateToken = function() {
    const user = this;
    const token = generateToken({ _id: user._id });
    return token;
};

const User = mongoose.model('User', userSchema);
module.exports = User;
