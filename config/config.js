require('dotenv').config();

const config = {
    env: process.env.NODE_ENV || 'development',
    isProd: process.env.NODE_ENV === 'production',
    port: process.env.PORT || 3000,
    dbUser: process.env.DB_USER,
    dbName: process.env.DB_NAME,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    dbPort: process.env.DB_PORT,
    jwtSecret: process.env.JWT_SECRET,
    dbUrl: process.env.DATABASE_URL,
    expireTimeAccessToken: process.env.EXPIRE_TIME_ACCESS_TOKEN
}

module.exports = { config };