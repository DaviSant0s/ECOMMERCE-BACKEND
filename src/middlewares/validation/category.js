const { validateName } = require('../../validators/category');

const validateCreateCategory = (req, res, next) => {
  const { name } = req.body;

  const categoryErrorMessage = (message) => {
    return {
      error: '@category/create',
      message: message,
    };
  };

  const errors = [validateName(name)].filter(Boolean);

  if (errors.length > 0) {
    return res.status(400).json(categoryErrorMessage(errors[0]));
  }

  return next();
};

module.exports = {
  validateCreateCategory,
};
