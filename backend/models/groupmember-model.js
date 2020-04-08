const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GroupMember = new Schema(
    {
        group: String,
        member: String
    }
)

module.exports = mongoose.model('groupmembers',GroupMember)