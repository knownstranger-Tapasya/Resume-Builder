const config = {
    mongoURI: process.env.MONGODB_URI,
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 5000,
    clientURL: process.env.CLIENT_URL || 'https://your-frontend-domain.com',
    nodeEnv: 'production'
};

module.exports = config; 