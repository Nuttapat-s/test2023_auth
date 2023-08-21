const UserRepo = require('./user.repo')
const jwt = require("jsonwebtoken")

class UserService {
    async validateUser(username, password) {
        try {
            let userRepo = new UserRepo();
            let user = await userRepo.findOneUser(username);
            if (!user) throw new Error('User not found')
            if (user.password === password) {
                return user;
            }
        } catch (error) {
            throw error;
        }

    }

    async genJwt(user) {
        try {
            let accessToken = await jwt.sign(
                { username: user.username, id: user.id },
                process.env.AUTH_ACCESS_TOKEN_SECRET,
                { expiresIn: "30m", algorithm: "HS256" }
            )

            let refreshToken = await jwt.sign(
                { username: user.username, id: user.id },
                process.env.AUTH_REFRESH_TOKEN_SECRET,
                { expiresIn: "1d", algorithm: "HS256" }
            )

            return {
                'accessToken': accessToken,
                'refreshToken': refreshToken
            }

        } catch (error) {
            throw error;
        }

    }

    async jwtValidateRefreshToken(refresh, res) {
        try {
    
            const token = refresh;
    
            return jwt.verify(token, process.env.AUTH_REFRESH_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    throw new Error(error);
                }
                return this.genJwt({
                    username:decoded.username,
                    id:decoded.id
                })
            })
    
        } catch (error) {
            return res.sendStatus(403)
        }
    }
}

module.exports = UserService;