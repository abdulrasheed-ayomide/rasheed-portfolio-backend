const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    port: process.env.PORT,
    githubToken: process.env.GITHUB_TOKEN,
};