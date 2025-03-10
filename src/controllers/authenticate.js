const User = require('../model/user');

const jwt = require('jsonwebtoken');

const { compareHash } = require('../utils/hashProvider');
const { JWT_SECRET } = require('../configs/env');

const signin =  async (req, res) => {
    const { password, email } = req.body

    try {
        // 'raw: true' possibilitar retornar os dados do banco como um objeto javascript simples
        const user = await User.findOne({ raw: true, where: { email }});

        if (!user) throw new Error();
  
        const isValidPassword = await compareHash(password, user.password);
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

    const { password, email, 
            firstName, lastName, 
            username, contactNumber, 
            profilePicture 
    } = req.body


    const UserData = { 
        password, 
        email, 
        firstName, 
        lastName, 
        username: Math.random().toString(), 
        contactNumber, 
        profilePicture,
        role: 'user'
    }

    try {
        const _user = await User.findOne({raw: true, where: {email}});

        if (_user) throw new Error('User already registered');

        const user = await User.create(UserData);

        if(!user) throw new Error();

        return res.status(201).json({ message: "User created Successfully"});
        
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
