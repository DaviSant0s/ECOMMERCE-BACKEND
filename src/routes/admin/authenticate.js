const { Router } = require('express');
const routes = Router();

const { signup, signin, signout } = require('../../controllers/admin/authenticate');
const { requiSignin } = require('../../middlewares/verifyAuthentication');
const { validateSignup, validateSignin } = require('../../middlewares/validation/authenticate');

routes.post('/admin/signup', validateSignup, signup);
routes.post('/admin/signin', validateSignin, signin);
routes.post('/admin/signout', requiSignin, signout);

module.exports = routes;