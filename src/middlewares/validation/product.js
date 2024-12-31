const {
    validateName,
    validatePrice,
    validateQuantity,
    validateDescription,
    validateCategory,
} = require('../../validators/product');


const validateCreateProduct = (req, res, next) => {

    const { name, price, quantity, description, category } = req.body;
    
    const productErrorMessage = (message) => {
        return {
            error: "@product/create",
            message: message
        };
    }

    const errors = [
        validateName(name),
        validatePrice(price),
        validateQuantity(quantity),
        validateDescription(description),
        validateCategory(category)
    ].filter(Boolean);

    if (errors.length > 0){
        return res.status(400).json(productErrorMessage(errors[0]));
    }

    return next();

}

module.exports = {
    validateCreateProduct,
}