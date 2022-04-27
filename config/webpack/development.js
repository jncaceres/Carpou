process.env.NODE_ENV = process.env.NODE_ENV || 'development'

const environment = require('./environment')
const dotenv = require('dotenv')
dotenv.config({path: '.env.development'})

module.exports = environment.toWebpackConfig()
