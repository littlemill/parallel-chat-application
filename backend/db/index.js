const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:12345@database-pwl4t.mongodb.net/test?retryWrites=true&w=majority";

mongoose
    .connect(uri, { useNewUrlParser: true , useUnifiedTopology: true })
    .then(console.log('Connected'))
    .catch(e => {
        console.error('Connection error', e.message)
    })
    
const db = mongoose.connection

module.exports = db