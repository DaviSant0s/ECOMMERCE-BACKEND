const Product = require('../model/product/product');
const Picture = require('../model/product/picture');
const Review = require('../model/product/review');
const slugify = require('slugify');
const Category = require('../model/category');

const createProduct = async (req, res) => {

    const { name, price, quantity, description, category } = req.body;
    const files = req.files || [];
    const createBy = req.user.id;

    const productPictures = files.map(file => ({img: file.filename}));

    const productData = {
        name,
        slug: slugify(name, { lower: true }),
        price,
        quantity,
        description,
        category,
        createBy
    }

    try {

        const product = await Product.create(productData);

        if(!product) throw new Error();

        const pictures = await Promise.all(
            productPictures.map(picture => (
                Picture.create({ 
                    img: picture.img, 
                    ProductId: product.id 
                })
            ))
        );

        const product_res = await Product.findByPk(product.id, {

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

        if(!product_res) throw new Error();

        return res.status(201).json({
            //product: product.toJSON(), 
            product: product_res,
            productPictures: pictures
        });
        
    } catch (error) {
        return res.status(400).json({
            error: "@products/create",
            message: error.message || "Product creation failed"
        });
    }
}

const getProducts = async (req, res) => {

    try {
        const products = await Product.findAll();

        return res.status(200).json({ products });
    
      } catch (error) {
        return res.status(400).json({
          error: '@products/get',
          message: error.message || 'Failed to get products',
        });
    }
}

module.exports = {
    createProduct,
    getProducts
}