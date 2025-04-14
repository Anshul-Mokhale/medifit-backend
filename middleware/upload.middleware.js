const multer = require('multer');
const path = require('path');

// Set up storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Save files in the "uploads" folder
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const filename = Date.now() + fileExt; // Add timestamp to file to avoid naming conflicts
        cb(null, filename);
    }
});

// Filter to only allow image files (jpg, jpeg, png)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimeType = allowedTypes.test(file.mimetype);
    if (mimeType) {
        return cb(null, true);
    }
    cb(new Error('Invalid file type. Only JPG, JPEG, PNG allowed'), false);
};

// Function to upload a single file
const uploadSingle = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).single('image'); // 'image' is the field name for a single file

// Function to upload multiple files
const uploadMultiple = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
}).array('images', 5); // 'images' is the field name for multiple files (up to 5 files)

const upload = (type) => {
    // Return appropriate middleware based on the 'type' argument
    switch (type) {
        case 'single':
            return uploadSingle;
        case 'multiple':
            return uploadMultiple;
        default:
            throw new Error('Invalid upload type');
    }
};

module.exports = upload;
