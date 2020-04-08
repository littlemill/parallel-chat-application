const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Chat = new Schema(
    {
        user: String,
        group: String,
        time: Date,
        message: String,
    }
)

module.exports = mongoose.model('chats', Chat)