const Category = require('../model/category');
const slugify = require('slugify');
const { API } = require('../configs/env');
const { createCategories } = require('../utils/createCategories');

const createCategory = async (req, res) => {

    const { name, parentId } = req.body;
    const file = req.file;

    console.log('euuuuu')
    const categoryData = {
        name,
        slug: slugify(name)
    }

    if(file) categoryData.categoryImage = API + '/public/' + file.filename;

    if (parentId) categoryData.parentId = parentId; 

    try {

        const cat = await Category.create(categoryData);

        if(!cat) throw new Error();

        return res.status(201).json({category: cat});
        
    } catch (error) {
        return res.status(400).json({
            error: "@categories/create",
            message: error.message || "Category creation failed"
        });
    }
}

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
}

module.exports = {
    createCategory,
    getCategories
}