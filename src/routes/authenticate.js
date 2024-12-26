const { Router } = require('express');
const routes = Router();

const AuthController = require('../controllers/authenticate');
const { validateSignup, validateSignin } = require('../middlewares/validation/authenticate');

routes.post('/signup', validateSignup, AuthController.signup);
routes.post('/signin', validateSignin, AuthController.signin);



module.exports = routes;