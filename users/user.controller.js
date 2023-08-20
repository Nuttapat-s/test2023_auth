const express = require('express');
const router = express.Router();
const UserService = require('./user.service');


router.post('/login', async (req, res) => {
    try {
        let userService = new UserService();
        let { username, password } = req.body;
        let user = await userService.validateUser(username, password);
        let tokens = await userService.genJwt(user);
        res.send(tokens);
    } catch (error) {
        res.sendStatus(500);
    }

})

module.exports = router;