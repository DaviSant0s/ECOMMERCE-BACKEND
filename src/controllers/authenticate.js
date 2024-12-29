const User = require('../model/user');

const jwt = require('jsonwebtoken');

const { compareHash } = require('../utils/hashProvider');
const { JWT_SECRET } = require('../configs/env');

const signin =  async (req, res) => {
    const { hash_password, email } = req.body

    try {
        // 'raw: true' possibilitar retornar os dados do banco como um objeto javascript simples
        const user = await User.findOne({ raw: true, where: { email }});

        if (!user) throw new Error();
  
        const isValidPassword = await compareHash(hash_password, user.hash_password);
        if (!isValidPassword) throw new Error();

        const id = user.id;
        const role = user.role;

        const token = jwt.sign({ id, role }, JWT_SECRET, { expiresIn : 1000});

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
            profilePicture 
    } = req.body


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
