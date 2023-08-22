const express = require('express');
const userRouter = require('./src/users/user.controller')
const dotenv = require('dotenv');
const mongoose = require('mongoose')
const Mock = require('./mock')

dotenv.config();

let mock = new Mock();

mongoose.Promise = global.Promise;
console.log(process.env.DB_URL)
mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('db connect success')

        //+++++++++++++++mock+++++++++
        mock.mockData();
        //+++++++++++++++mock+++++++++
    })
    .catch((err) => console.log(err))


let app = express();
app.use(express.json());

app.use('/users', userRouter)

app.listen(process.env.PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", process.env.PORT);
});



