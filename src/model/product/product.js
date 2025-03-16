const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const User = require('../user');
const Category = require('../category');

const Product = db.define('Product', {
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

    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    offer: {
        type: DataTypes.FLOAT,
        allowNull: true
    },

    createBy: {
        type: DataTypes.STRING,
        references: {
            model: User,
            key: 'id'
        }
    },

    category: {
        type: DataTypes.STRING,
        references: {
            model: Category,
            key: 'id'
        }
    }

});

Product.beforeCreate(product => {
    const hashed_id = uuid.v4();
    product.id = hashed_id;
});

// Relacionamentos

User.hasMany(Product, {
    foreignKey: 'createBy',
    onDelete: 'SET NULL'
});

Product.belongsTo(User, {foreignKey: 'createBy'});

Category.hasMany(Product, {
    foreignKey: 'category',
    onDelete: 'SET NULL'
});

Product.belongsTo(Category, {foreignKey: 'category'});

module.exports = Product;