const {
    validatePrice,
    validateQuantity,
} = require('../../validators/cart');


const validateAddToCart = (req, res, next) => {

    const { price, quantity } = req.body;
    
    const cartErrorMessage = (message) => {
        return {
            error: "@product/create",
            message: message
        };
    }

    const errors = [
        validatePrice(price),
        validateQuantity(quantity),
    ].filter(Boolean);

    if (errors.length > 0){
        return res.status(400).json(cartErrorMessage(errors[0]));
    }

    return next();

}

module.exports = {
    validateAddToCart,
}