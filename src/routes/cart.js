const { Router } = require('express');
const routes = Router();

const { addItemToCart } = require('../controllers/cart');
const { requiSignin, verifyUser } = require('../middlewares/verifyAuthentication');
const { validateAddToCart } = require('../middlewares/validation/cart');
    
routes.post('/user/cart/addToCart', requiSignin, verifyUser, validateAddToCart, addItemToCart);

routes.get('/cart/getCart', requiSignin);

module.exports = routes;    