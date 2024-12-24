const { Router } = require('express');
const routes = Router();

const AuthController = require('../controllers/authenticate');

routes.post('/signup', AuthController.signup);
routes.post('/signin', AuthController.signin);



module.exports = routes;