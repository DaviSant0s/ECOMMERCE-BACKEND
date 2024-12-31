const db = require('../../database/conn');

const uuid = require('uuid');

const { DataTypes } = require('sequelize');
const User = require('../user');

const Cart = db.define('Cart', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
    }, 

    user_id: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,

        references: {
            model: User,
            key: 'id'
        }
    },

});

Cart.beforeCreate(cart => {
    const hashed_id = uuid.v4()
    cart.id = hashed_id;
});

// Relacionamentos
User.hasOne(Cart, { foreignKey: 'user_id', onDelete: 'cascade'});
Cart.belongsTo(User, { foreignKey: 'user_id'});


module.exports = Cart;