const {
    validateFirstName,
    validateLastName,
    validateEmail,
    validatePassword,
    validateUsername,
    validateContactNumber
} = require('../../validators/authenticate');

const validateSignin = (req, res, next) => {

    const { hash_password, email } = req.body

    const signinErrorMessage = (message) => {
        return {
            error: "@authenticate/signin",
            message: message
        };
    }

    const errors = [
        validateEmail(email),
        validatePassword(hash_password)
    ].filter(Boolean);


    if (errors.length > 0){
        return res.status(400).json(signinErrorMessage(errors[0]));
    }

    return next();

}

const validateSignup = (req, res, next) => {
    const { hash_password, email, 
        firstName, lastName, 
        username, contactNumber, 
        profilePicture 
    } = req.body
    
    const signupErrorMessage = (message) => {
        return {
            error: "@authenticate/signup",
            message: message
        };
    }

    const errors = [
        validateFirstName(firstName),
        validateLastName(lastName),
        validateEmail(email),
        validatePassword(hash_password),
        validateContactNumber(contactNumber)
    ].filter(Boolean);

    if (errors.length > 0){
        return res.status(400).json(signupErrorMessage(errors[0]));
    }

    return next();

}

module.exports = {
    validateSignin,
    validateSignup
}


