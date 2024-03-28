const { Strategy, ExtractJwt } = require('passport-jwt');

const { config } = require('../../../config/config');
const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
}

const JwtTrategy = new Strategy(options, (payload, done) => {
    return done(null, payload);
});

module.exports = JwtTrategy;