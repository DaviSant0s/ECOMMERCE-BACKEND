const User = require('../model/user');

const validator = require('validator');
const jwt = require('jsonwebtoken');

const { compareHash } = require('../utils/hashProvider');
const { JWT_SECRET } = require('../configs/env');

const signin =  async (req, res) => {
    const { hash_password, email } = req.body

    const signinErrorMessage = (message) => {
        return {
            error: "@authenticate/signin",
            message: message
        };
    }

    // Verifica se o campo de email e senha vieram vazios
    if(!email) return res.status(400).json(signinErrorMessage("Email is required"));
    if(!hash_password) return res.status(400).json(signinErrorMessage("Password is required"));

    // validação do email
    const isEmail = validator.isEmail(email);
    if(!isEmail) return res.status(400).json(signinErrorMessage("Invalid email format"));

    try {
        // 'raw: true' possibilitar retornar os dados do banco como um objeto javascript simples
        const user = await User.findOne({ raw: true, where: { email }});

        if (!user) throw new Error();
  
        const isValidPassword = await compareHash(hash_password, user.hash_password);
        if (!isValidPassword) throw new Error();

        const id = user.id;

        const token = jwt.sign({ id }, JWT_SECRET, { expiresIn : 300});

        const fullName = `${user.firstName} ${user.lastName}`;

        return res.status(200).json({token, user: {...user, fullName}});

    } catch (error) {
        return res.status(400).json({
            error: "@authenticate/signin",
            message: error.message || "Authentication failed"
        });
    }
}

const signup = async (req, res) => {

    const { hash_password, email, 
            firstName, lastName, 
            username, contactNumber, 
            profilePicture } = req.body

            
    const signupErrorMessage = (message) => {
        return {
            error: "@authenticate/signup",
            message: message
        };
    }

    // Verificando se os campos estão vazios
    if(!email) return res.status(400).json(signupErrorMessage("Email is required"));
    if(!hash_password) return res.status(400).json(signupErrorMessage("Password is required"));
    if(!firstName) return res.status(400).json(signupErrorMessage("First Name is required"));
    if(!lastName) return res.status(400).json(signupErrorMessage("Last Name is required"));
    // if(!username) return res.status(400).json(signupErrorMessage("Username is required"));

    // validação do email
    const isEmail = validator.isEmail(email);
    if(!isEmail) return res.status(400).json(signupErrorMessage("Invalid email format"));

    // validação de tamanho de first e last name
    if(firstName.length < 3) return res.status(400).json(signupErrorMessage("The First Name provided is too short"));
    if(firstName.length > 20) return res.status(400).json(signupErrorMessage("The First Name provided is too long"));
    if(lastName.length < 3) return res.status(400).json(signupErrorMessage("The Last Name provided is too short"));
    if(lastName.length > 20) return res.status(400).json(signupErrorMessage("The Last Name provided is too long"));


    const UserData = { 
        hash_password, 
        email, 
        firstName, 
        lastName, 
        username: Math.random().toString(), 
        contactNumber, 
        profilePicture 
    }

    

    
    try {
        const _user = await User.findOne({raw: true, where: {email}});

        if (_user) throw new Error('User already registered');

        const user = await User.create(UserData);

        if(!user) throw new Error();

        return res.status(201).json(user);
        
    } catch (error) {
        return res.status(400).json({
            error: "@authenticate/signup",
            message: error.message || "Authentication failed"
        });
    }
}

module.exports = {
    signin, 
    signup
}
