const Category = require('../model/category');
const slugify = require('slugify');

const create = async (req, res) => {

    const { name, parentId } = req.body;

    const categoryObj = {
        name,
        slug: slugify(name)
    }

    if (parentId) categoryObj.parentId = parentId; 

    try {

        const cat = await Category.create(categoryObj);

        if(!cat) throw new Error();

        return res.status(201).json(cat);
        
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
    
        return res.status(200).json(categories)
    
      } catch (error) {
        return res.status(400).json({
          error: '@categories/get',
          message: error.message || 'Failed to get categories',
        });
    }
}

module.exports = {
    create,
    getCategories
}