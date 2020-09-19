module.exports = () => ({
    app: {
        port: process.env.PORT || 4000,
        apiUrl: process.env.API_URL || 'http://localhost:3000/api'
    },
});