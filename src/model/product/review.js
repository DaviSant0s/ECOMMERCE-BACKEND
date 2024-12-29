const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const Product = require('./product');
const User = require('../user');

const Review = db.define('Review', {

    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    comment: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5
        }
    }

});

Review.beforeCreate(review => {
    const hashed_id = uuid.v4();
    review.id = hashed_id;
});

// Relacionamentos

Product.hasMany(Review, { onDelete: 'cascade' });
Review.belongsTo(Product);

User.hasMany(Review, { onDelete: 'cascade' });
Review.belongsTo(User);

module.exports = Review;