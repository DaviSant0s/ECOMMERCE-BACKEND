const Product = require('../model/product/product');
const Picture = require('../model/product/picture');
const Review = require('../model/product/review');
const slugify = require('slugify');
const Category = require('../model/category');

const createProduct = async (req, res) => {

    const { name, price, quantity, description, category } = req.body;
    const createBy = req.user.id;

    const productPictures = req.uploadedImages.map(link => ({img: link}));

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

const getProductsBySlug = async (req, res) => {
    const { slug } = req.params;
    
    try {
        const category = await Category.findOne({ where: {slug}, attributes: ['id']});

        if(!category) throw new Error();

        /*const products = await Product.findAll({ where: { category: category.id }});*/

        const products = await Product.findAll({
            where: { category: category.id },
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

        if(!products && products.length === 0) throw new Error();

        const under_250 = products.filter(product => product.price <= 250.00);
        const between_250_and_500 = products.filter(product => product.price >= 250.00 && product.price <= 500.00);
        const between_500_and_1000 = products.filter(product => product.price >= 500.00 && product.price <= 1000.00);
        const between_1000_and_2000 = products.filter(product => product.price >= 1000.00 && product.price <= 2000.00);
        const over_2000 = products.filter(product => product.price >= 2000.00);


        return res.status(200).json({ products,
            productsByPrice: {
                under_250,
                between_250_and_500,
                between_500_and_1000,
                between_1000_and_2000,
                over_2000,
            }
         });
    
      } catch (error) {

        return res.status(400).json({
          error: '@products/getBySlug',
          message: error.message || 'Failed to get products by Slug',
        });
    }

}

module.exports = {
    createProduct,
    getProducts,
    getProductsBySlug
}