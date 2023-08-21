const User = require('./users/models/user.models')
const mongoose = require('mongoose')

class Mock{
    async mockData(){
        let checkData = [];
        await User.find({}).then((data) => {
            checkData = data;
        })
    
        if (checkData.length === 0) {
            User.insertMany([
                {
                    'username': 'test1',
                    'password': '1234',
                    'email':'test1@g.com'
                },
                {
                    'username': 'test2',
                    'password': '1234',
                    'email':'test2@g.com'
                },
                {
                    'username': 'test3',
                    'password': '1234',
                    'email':'test3@g.com'
                }
    
            ]).catch((err) => {
                console.log('error mock data');
            })
        }
    }
}

module.exports = Mock;