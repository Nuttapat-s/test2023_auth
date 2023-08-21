const { connect } = require('./user.controller');
const User = require('./models/user.models')


class UserRepo {

    async findUser() {
        return await User.find({}).then((data) => {
            return data
        }).catch((err) => {
            throw err;
        })
    }

    async findOneUser(username,password) {
        return await User.findOne({username:username}).then((data) => {
            return data
        }).catch((err) => {
            throw err;
        })
    }

    async create(username,password,email){
        await User.insertMany([{username,password,email}])
        return {
            message: 'success'
        }
    }

}

module.exports = UserRepo;


