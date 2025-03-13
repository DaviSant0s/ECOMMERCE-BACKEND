const { Router } = require('express');
const routes = Router();

const { createProduct, getProducts } = require('../controllers/product')
const { requiSignin, verifyAdmin } = require('../middlewares/verifyAuthentication');
const { validateCreateProduct } = require('../middlewares/validation/product');

const upload = require('../configs/multer');
const cloudinary_upload = require('../middlewares/cloudinaryUploader');

routes.post('/product/create', 
    requiSignin, verifyAdmin, 
    validateCreateProduct, 
    upload.array('productPicture'), 
    cloudinary_upload,
    createProduct
);

routes.get('/product/getProducts', getProducts);

module.exports = routes;