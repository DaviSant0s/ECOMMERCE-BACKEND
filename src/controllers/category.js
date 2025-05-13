const db = require('../database/conn');
const Category = require('../model/category');
const slugify = require('slugify');
const { API } = require('../configs/env');
const { createCategories } = require('../utils/createCategories');
const { Op } = require('sequelize');

const createCategory = async (req, res) => {
  const { name, parentId } = req.body;
  const file = req.file;

  const categoryData = {
    name,
    slug: slugify(name, { lower: true }),
    parentId: '',
  };

  if (file) categoryData.categoryImage = API + '/public/' + file.filename;

  if (parentId) categoryData.parentId = parentId;

  try {
    const cat = await Category.create(categoryData);

    if (!cat) throw new Error();

    return res.status(201).json({ category: cat });
  } catch (error) {
    return res.status(400).json({
      error: '@categories/create',
      message: error.message || 'Category creation failed',
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll();
    const categoryList = createCategories(categories);

    return res.status(200).json({ categoryList });
  } catch (error) {
    return res.status(400).json({
      error: '@categories/get',
      message: error.message || 'Failed to get categories',
    });
  }
};

const updateCategories = async (req, res) => {
  const { id, name, parentId } = req.body;

  const updatedCategories = [];

  if (name instanceof Array) {
    for (let i = 0; i < name.length; i++) {
      const category = {
        name: name[i],
        parentId: '',
      };

      if (parentId[i] !== '') category.parentId = parentId[i];

      try {
        const updated = await Category.update(category, {
          where: {
            id: id[i],
          },
        });

        if (updated[0] == 0) throw new Error();

        const updatedCategory = await Category.findByPk(id[i], { raw: true });

        updatedCategories.push(updatedCategory);
      } catch (error) {
        return res.status(400).json({
          error: '@categories/update',
          message: error.message || 'Failed to update categories',
        });
      }
    }

    return res.status(200).json({ updatedCategories });
  } else {
    const category = {
      name,
      parentId: '',
    };

    if (parentId !== '') category.parentId = parentId;

    try {
      const updated = await Category.update(category, {
        where: {
          id: id,
        },
      });

      if (updated[0] == 0) throw new Error();

      const updatedCategory = await Category.findByPk(id, { raw: true });

      return res.status(200).json({ updatedCategories: updatedCategory });
    } catch (error) {
      return res.status(400).json({
        error: '@categories/update',
        message: error.message || 'Failed to update categories',
      });
    }
  }
};

const deleteCategories = async (req, res) => {
  const { ids } = req.body;

  const idsOnly = ids.map((item) => item.id).filter(Boolean);

  const transaction = await db.transaction();

  try {
    const deletedCategories = await Category.destroy({
      where: {
        id: {
          [Op.in]: idsOnly,
        },
      },

      transaction

    });

    await transaction.commit();

    return res.status(200).json({ message: `${deletedCategories} categories excluded.` });

  } catch (error) {
    await transaction.rollback();
    return res.status(400).json({
      error: '@categories/delete',
      message: error.message || 'Failed to delete categories',
    });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategories,
  deleteCategories,
};
