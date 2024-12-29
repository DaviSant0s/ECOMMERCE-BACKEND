const multer = require('multer');
const { nanoid } = require('nanoid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'));
    },

    filename: function (req, file, cb) {
        cb(null, nanoid() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

module.exports = upload;