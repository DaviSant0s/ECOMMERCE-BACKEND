const { Router } = require('express');
const routes = Router();

const AuthController = require('../../controllers/admin/authenticate');
const { requiSignin } = require('../../middlewares/admin/verifyAuthentication');
const { validateSignup, validateSignin } = require('../../middlewares/validation/authenticate');

routes.post('/admin/signup', validateSignup, AuthController.signup);
routes.post('/admin/signin', validateSignin, AuthController.signin);

routes.post('/profile/', requiSignin, (req, res) => {
    res.status(200).json({user: 'profile'})
})


module.exports = routes;