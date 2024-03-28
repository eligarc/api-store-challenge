const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserService = require('./user.service');
const { config } = require('./../config/config');

const service = new UserService;

class AuthService {
    async getUser(email, password) {
        const user = await service.findEmail(email);
        if (!user) {
            throw boom.unauthorized();
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw boom.unauthorized();
        }
        delete user.dataValues.password;
        return user;
    }

    signToken(user) {
        const payload = {
            sub: user.id,
            role: user.role,
            exp: Math.floor(Date.now() / 1000) + (config.expireTimeAccessToken * 60)
        }
        const access_token = jwt.sign(payload, config.jwtSecret);
        return { access_token };
    }
}

module.exports = AuthService;