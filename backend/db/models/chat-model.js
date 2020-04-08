const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema(
    {
        username: { type: String, required: true },
        time: { type: [String], required: true },
        message: { type: String, required: true },
        groupID: { type: Number, required: false},
    },
    { timestamps: true },
)
 
module.exports = mongoose.model('chats', Chat)