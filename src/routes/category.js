const { Router } = require('express');
const routes = Router();

const { createCategory, getCategories } = require('../controllers/category')
const { requiSignin, verifyAdmin, verifyUser } = require('../middlewares/verifyAuthentication');

const upload = require('../configs/multer');
    
routes.post('/category/create', 
    requiSignin, 
    verifyUser, 
    upload.single('categoryImage'), 
    createCategory
);

routes.get('/category/getCategories', getCategories);

module.exports = routes;    