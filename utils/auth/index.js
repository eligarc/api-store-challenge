const password = require('passport');

const LocalStrategy = require('./strategies/local.strategy');
const JwtStrategy = require('./strategies/jwt.strategy');

password.use(LocalStrategy);
password.use(JwtStrategy);