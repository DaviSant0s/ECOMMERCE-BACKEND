const validator = require('validator');

const validateName = (name) => {
  console.log(name)
  if (!name || validator.isEmpty(name)) return 'Category name is required';

  return null;
};

const validateSlug = (slug) => {
  if (!slug || validator.isEmpty(slug)) return 'Category slug is required';

  return null;
};

const validateCategoryImage = (categoryImage) => {
  if (!categoryImage || validator.isEmpty(categoryImage))
    return 'Category image link is required';

  return null;
};

module.exports = {
  validateName,
  validateSlug,
  validateCategoryImage,
};
