const db = require('../database/conn');
const Cart = require('../model/cart/cart');
const CartItem = require('../model/cart/cartItem');

const addItemToCart = async (req, res) => {
    const { quantity, price, product_id } = req.body;
    const user_id = req.user.id;

    const cartItemData = {
        quantity,
        price,
        product_id
    }

    const transaction = await db.transaction();

    try {
        // cart
        let cart = await Cart.findOne({ where: {user_id} }, { transaction });

        if(!cart) cart = await Cart.create({ user_id }, { transaction });

        if(!cart) throw new Error('failed to create cart');

        const cart_id = cart.id;

        // cartItens

        let cartItem = await CartItem.findOne({ where: {product_id, cart_id } }, { transaction });

        if(!cartItem) {
            cartItem = await CartItem.create({ ...cartItemData, cart_id }, { transaction });

        } else {
            const updatedQuantity = cartItem.quantity + quantity;
            await cartItem.update({ quantity: updatedQuantity }, { transaction });
        }

        if (!cartItem) throw new Error();

        await transaction.commit();

        return res.status(200).json({ cart: { ...cart.toJSON(), cartItems: cartItem.toJSON()} });
         
    } catch (error) {
        return res.status(400).json({
            error: "@cart/addItem",
            message: error.message || "Failed to add item to cart"
        });
    }
    
}

module.exports = {
    addItemToCart
}