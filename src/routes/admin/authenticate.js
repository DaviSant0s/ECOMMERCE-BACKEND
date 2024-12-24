const { Router } = require('express');
const routes = Router();

const AuthController = require('../../controllers/admin/authenticate');
const { requiSignin } = require('../../middlewares/admin/verifyAuthentication')

routes.post('/admin/signup', AuthController.signup);
routes.post('/admin/signin', AuthController.signin);

routes.post('/profile/', requiSignin, (req, res) => {
    res.status(200).json({user: 'profile'})
})


module.exports = routes;