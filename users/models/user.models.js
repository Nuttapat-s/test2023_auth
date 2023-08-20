const mongoose = require('mongoose')

const Users = new mongoose.Schema({
    username: String,
    password: String,
    createAt: {type:Date,default:Date.now},
    updateAt: {type:Date,default:Date.now}
})

module.exports = mongoose.model('Users',Users)