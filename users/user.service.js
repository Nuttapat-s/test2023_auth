const UserRepo = require('./user.repo')
const jwt = require("jsonwebtoken")

class UserService {
    constructor(){
        this.userRepo = new UserRepo();
    }
    async validateUser(username, password) {
        try {
            let user = await this.userRepo.findOneUser(username);
            if (!user) throw new Error('User not found')
            if (user.password === password) {
                return user;
            }else{
                throw new Error('Password Invalid')
            }
        } catch (error) {
            throw error;
        }

    }

    async genJwt(user) {
        try {
            let accessToken = await jwt.sign(
                { username: user.username, id: user.id,email: user.email },
                process.env.AUTH_ACCESS_TOKEN_SECRET,
                { expiresIn: "30m", algorithm: "HS256" }
            )

            let refreshToken = await jwt.sign(
                { username: user.username, id: user.id ,email: user.email},
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
    
            return await jwt.verify(token, process.env.AUTH_REFRESH_TOKEN_SECRET,async (err, decoded) => {
                if (err) {
                    throw new Error(err);
                }
                let data = await this.genJwt({
                    username:decoded.username,
                    email:decoded.email,
                    id:decoded.id
                })

                return data
            })

    
        } catch (error) {
            return error
        }
    }

    async create(username,password,email){
        let user = await this.userRepo.findOneUser(username);
        if(user) {
            throw new Error('user is already exist')
        }
        return await this.userRepo.create(username,password,email)
    }
}

module.exports = UserService;