const db = require('../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');

const Category = db.define('Category', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    slug: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },

    categoryImage: {
        type: DataTypes.STRING,
    },

    parentId: {
        type: DataTypes.STRING,
        allowNull: true
    },

});

Category.beforeCreate(category => {
    const hashed_id = uuid.v4()
    category.id = hashed_id;
});

module.exports = Category;