const { Schema, model } = require("mongoose");



const goalSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    text: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})


module.exports = model('Goal', goalSchema)