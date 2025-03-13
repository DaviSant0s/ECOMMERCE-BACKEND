const cloudinary = require('cloudinary').v2;
const { cloudinary_env } = require('./env');

cloudinary.config({
    cloud_name: cloudinary_env.CLOUDINARY_CLOUD_NAME,
    api_key: cloudinary_env.CLOUDINARY_API_KEY,
    api_secret: cloudinary_env.CLOUDINARY_SECRET_KEY
});

module.exports = cloudinary;