const { Router } = require('express');
const routes = Router();

const { signup, signin } = require('../../controllers/admin/authenticate');
const { requiSignin } = require('../../middlewares/verifyAuthentication');
const { validateSignup, validateSignin } = require('../../middlewares/validation/authenticate');

routes.post('/admin/signup', validateSignup, signup);
routes.post('/admin/signin', validateSignin, signin);

routes.post('/profile/', requiSignin, (req, res) => {
    res.status(200).json({user: 'profile'})
})


module.exports = routes;