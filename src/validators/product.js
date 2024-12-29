const validator = require('validator');

const validateName = (name) => {

    if(validator.isEmpty(name)) return "Name is required";

    return null
}

const validatePrice = (price) => {

    if(validator.isEmpty(price)) return "Price is required";

    return null
}

const validateQuantity = (quantity) => {

    if(validator.isEmpty(quantity)) return "Quantity is required";

    return null
}

const validateDescription = (description) => {

    if(validator.isEmpty(description)) return "Description is required";

    return null
}

const validateCategory = (category) => {

    if(validator.isEmpty(category)) return "Category is required";

    return null;

}

module.exports = {
    validateName,
    validatePrice,
    validateQuantity,
    validateDescription,
    validateCategory,
}