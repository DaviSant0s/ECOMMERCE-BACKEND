const { Router } = require('express');
const routes = Router();

const {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
} = require('../controllers/category');

const {
  requiSignin,
  verifyAdmin,
  verifyUser,
} = require('../middlewares/verifyAuthentication');

const upload = require('../configs/multer');
const { validateCreateCategory } = require('../middlewares/validation/category');

routes.post(
  '/category/create',
  validateCreateCategory,
  requiSignin,
  verifyAdmin,
  upload.single('categoryImage'),
  createCategory
);

routes.get('/category/getCategories', getCategories);

routes.post(
  '/category/updateCategories',
  upload.array('categoryImage'),
  updateCategories
);

routes.post('/category/deleteCategories', deleteCategories);

module.exports = routes;
