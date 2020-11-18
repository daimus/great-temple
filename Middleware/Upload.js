const util = require('util');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination : path.join('./public/uploads/'),
    filename: function(req, file, cb){
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

let uploadPictures = multer({
    storage: storage
}).array('pictures');

let uploadMiddleware = util.promisify(uploadPictures);

module.exports = uploadMiddleware;