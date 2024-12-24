const db = require('../database/conn');

const { generateHash } = require('../utils/hashProvider');
const uuid = require('uuid')

const { DataTypes } = require('sequelize');

const User = db.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
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
    const hashed_id = uuid.v4()
    user.hash_password = hashedPassword;
    user.id = hashed_id;
});

User.beforeUpdate( async (user) => {
    const hashedPassword = await generateHash(user.hash_password);
    user.hash_password = hashedPassword;
});

module.exports = User;