const { Router } = require('express');
const routes = Router();

const { create, getCategories } = require('../controllers/category')
const { requiSignin, verifyAdmin } = require('../middlewares/verifyAuthentication');
    
routes.post('/category/create', requiSignin, verifyAdmin, create);
routes.get('/category/getCategories', getCategories);

module.exports = routes;    