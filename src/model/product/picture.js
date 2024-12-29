const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const Product = require('./product');

const Picture = db.define('Picture', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    img: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Picture.beforeCreate(picture => {
    const hashed_id = uuid.v4();
    picture.id = hashed_id;
});

Product.hasMany(Picture, { onDelete: 'cascade' });
Picture.belongsTo(Product);

module.exports = Picture;