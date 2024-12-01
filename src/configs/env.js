require('dotenv').config();

module.exports = {
    database: process.env.MYSQL_DATABASE,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    options: {
      host: process.env.MYSQL_HOST,
      dialect: process.env.MYSQL_DIALECT,
    },
    PORT: process.env.PORT
}