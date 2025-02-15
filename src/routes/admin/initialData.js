const { Router } = require('express');
const routes = Router();

const { initialData } = require('../../controllers/admin/initialData');
const { requiSignin, verifyAdmin } = require('../../middlewares/verifyAuthentication');

routes.post('/initialdata', 
    //requiSignin, 
    //verifyAdmin, 
    initialData
);

module.exports = routes;