const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const Cart = require('./cart');
const Product = require('../product/product');

const CartItem = db.define('CartItem', {

    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    },

    quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
    },

    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },

    product_id: {
        type: DataTypes.STRING,
        allowNull: false,

        references: {
            model: Product,
            key: 'id'
        }
    },

    cart_id: {
        type: DataTypes.STRING,
        allowNull: false,

        references: {
            model: Cart,
            key: 'id'
        }
    },

});

CartItem.beforeCreate(cartItem => {
    const hashed_id = uuid.v4()
    cartItem.id = hashed_id;
});

// Relacionamentos
Cart.hasMany(CartItem, { foreignKey: 'cart_id', onDelete: 'cascade'});
CartItem.belongsTo(Cart, { foreignKey: 'cart_id'});

Product.hasMany(CartItem, { foreignKey: 'product_id', onDelete: 'cascade'});
CartItem.belongsTo(Product, { foreignKey: 'product_id'});

module.exports = CartItem;