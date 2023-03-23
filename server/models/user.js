const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const passwordComplexity = require("joi-password-complexity");
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true},
    password: { type: String, require: true},
    password_confirmation: { type: String, require: true}
    
},{ timestamps: true });

userSchema.methods.generateAuthToken = () => {
    const token = jwt.sign({_id:this._id}, process.env.JWTPRIVATEKEY,{expiresIn: "7d"});
    return token
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
    const schema = Joi.object({
        name: Joi.string().required().label("Name"),
        email: Joi.string().email().required().label("Email"),
        password : passwordComplexity().required().label("Password"),
        password_confirmation: Joi.any().equal(Joi.ref('password')).required().label('Confirm password')
    });
    return schema.validate(data)
};

module.exports = {User, validate}