const Product = require('../model/product/product');
const Picture = require('../model/product/picture');
const Review = require('../model/product/review');
const slugify = require('slugify');

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

        return res.status(201).json({
            product: product.toJSON(), 
            productPictures: pictures
        });
        
    } catch (error) {
        return res.status(400).json({
            error: "@products/create",
            message: error.message || "Product creation failed"
        });
    }
}

module.exports = {
    createProduct
}