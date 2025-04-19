const Category = require('../../model/category');
const Picture = require('../../model/product/picture');
const Product = require('../../model/product/product');
const Review = require('../../model/product/review');
const { createCategories } = require('../../utils/createCategories');

const initialData = async (req, res) => {

    try {
        const products = await Product.findAll({
          attributes: [ 'id', 'name', 'slug', 'price', 'quantity', 'description', 'offer', 'category'],
          include: [
            {
              model: Picture,
              attributes: [ 'id', 'img']
            },
            {
              model: Review
            },
            {
              model: Category,
              attributes: [ 'id', 'name']
            }
          ]
        });
        
        const categories = await Category.findAll({raw: true});

        return res.status(200).json({ 
          categories: createCategories(categories),
          products
        });
    
      } catch (error) {
        return res.status(400).json({
          error: '@initialData/get',
          message: error.message || 'Failed to get initial data',
        });
    }
}

module.exports = {
    initialData
}