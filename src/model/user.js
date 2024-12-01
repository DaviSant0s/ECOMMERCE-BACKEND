const db = require('../database/conn');

const { generateHash } = require('../utils/hashProvider');

const { DataTypes } = require('sequelize');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }, 

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 20
        }
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            min: 3,
            max: 20
        }
    },

    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    hash_password: {
        type: DataTypes.STRING,
        allowNull: false
    },

    role: {
        type: DataTypes.ENUM, 
        values: ['user', 'admin'],
        defaultValue: 'admin'
    },

    contactNumber: {
        type: DataTypes.STRING
    },

    profilePicture: {
        type: DataTypes.STRING
    }
});

User.beforeCreate( async (user) => {
    const hashedPassword = await generateHash(user.hash_password);
    user.hash_password = hashedPassword;
});

User.beforeUpdate( async (user) => {
    const hashedPassword = await generateHash(user.hash_password);
    user.hash_password = hashedPassword;
});

module.exports = User;