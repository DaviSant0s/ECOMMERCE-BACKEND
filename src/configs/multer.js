const multer = require('multer');

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({storage});

module.exports = upload;

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },

    filename: function (req, file, cb) {
        cb(null, nanoid() + '-' + file.originalname);
    }
});
*/
