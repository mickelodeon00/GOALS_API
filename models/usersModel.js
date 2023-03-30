const mongoose = require("mongoose");




const userModel = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name field is required"]
    },
    email: {
        type: String,
        required: [true, "email field is required"]
    },
    password: {
        type: String,
        required: [true, "password field is required"]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userModel)