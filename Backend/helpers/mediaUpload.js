const multer = require("multer");

// allowed mime types for media files
const allowedMimeTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
];

// maximum file size for media files -> 1MB
const fileSize = 1000000;

// file filter option 
function fileFilter(req, file, cb) {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error(`Only [${allowedMimeTypes}] files are allowed`), false);
    }
};

// multer storage options
const storage = multer.diskStorage({});

// upload middlewares
const upload = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: fileSize,
        files: 1
    }
});

module.exports = {
    upload,
};