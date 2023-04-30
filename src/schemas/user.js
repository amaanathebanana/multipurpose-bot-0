const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userID: String,
    messageCount: Number,
})
module.exports = mongoose.model('users', userSchema);