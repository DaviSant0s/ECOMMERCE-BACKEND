const cloudinary = require('../configs/cloudinary');
const { nanoid } = require('nanoid');

const cloudinary_upload = async (req, res, next) => {
    
    const files = req.files || [];

    try {
        const uploadPromises = files.map(file => 
            cloudinary.uploader.upload(file.path, { 
                folder: "ecommerce/products",
                public_id: nanoid() + '-' + file.originalname
            })
        );

        const uploadResults = await Promise.all(uploadPromises);

        // Armazena os links das imagens no req para serem usados depois
        req.uploadedImages = uploadResults.map(result => result.secure_url);

        next();

    } catch (err) {
        return res.status(400).json({
            error: "@cloudinary/upload",
            message: err.message || "Image upload failed"
        });
    }
    
}

module.exports = cloudinary_upload;