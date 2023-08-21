const express = require('express');
const router = express.Router();
const UserService = require('./user.service');

let userService = new UserService();

router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;
        let user = await userService.validateUser(username, password);
        let tokens = await userService.genJwt(user);
        res.send(tokens);
    } catch (error) {
        res.sendStatus(500);
    }

})

router.post('/refresh',async (req,res) =>{
    try {
        return await userService.jwtValidateRefreshToken(req.body.refreshToken,res)
    } catch (error) {
        res.sendStatus(500);
    }
})

module.exports = router;