const validator = require('validator');

const validatePrice = (price) => {

    if(validator.isEmpty(price.toString())) return "Price is required";

    return null
}

const validateQuantity = (quantity) => {

    if(validator.isEmpty(quantity.toString())) return "Quantity is required";

    return null
}

module.exports = {
    validatePrice,
    validateQuantity,
}