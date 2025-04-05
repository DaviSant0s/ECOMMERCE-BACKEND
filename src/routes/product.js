const { Router } = require('express');
const routes = Router();

const { createProduct, getProducts, getProductsBySlug } = require('../controllers/product')
const { requiSignin, verifyAdmin } = require('../middlewares/verifyAuthentication');
const { validateCreateProduct } = require('../middlewares/validation/product');

const upload = require('../configs/multer');
const cloudinary_upload = require('../middlewares/cloudinaryUploader');

routes.post('/product/create', 
    requiSignin, verifyAdmin, 
    upload.array('productPicture'), 
    validateCreateProduct, 
    cloudinary_upload,
    createProduct
);

routes.get('/product/getProducts', getProducts);

routes.get('/products/:slug', getProductsBySlug);

module.exports = routes;