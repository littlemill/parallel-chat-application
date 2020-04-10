const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Group = new Schema(
    {
        name: String
    }
)

module.exports = mongoose.model('groups', Group)