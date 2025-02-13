const { Router } = require('express');
const routes = Router();

const { createProduct, getProducts } = require('../controllers/product')
const { requiSignin, verifyAdmin } = require('../middlewares/verifyAuthentication');
const { validateCreateProduct } = require('../middlewares/validation/product');

const upload = require('../configs/multer');

routes.post('/product/create', 
    requiSignin, verifyAdmin, 
    upload.array('productPicture'), 
    validateCreateProduct, 
    createProduct
);

routes.get('/product/getProducts', getProducts);

module.exports = routes;