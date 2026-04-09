const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const createUploadDirs = () => {
    const dirs = [
        'uploads/safaris',
        'uploads/destinations',
        'uploads/temp'
    ];

    dirs.forEach(dir => {
        const fullPath = path.join(__dirname, '..', dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`Created directory: ${fullPath}`);
        }
    });
};

// Create directories when the module loads
createUploadDirs();

// Configure storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'uploads/temp';

        // Determine folder based on request path or fieldname
        if (req.baseUrl && req.baseUrl.includes('safaris')) {
            folder = 'uploads/safaris';
        } else if (req.baseUrl && req.baseUrl.includes('destinations')) {
            folder = 'uploads/destinations';
        } else if (file.fieldname === 'image') {
            folder = 'uploads/safaris';
        } else if (file.fieldname === 'banner') {
            folder = 'uploads/destinations';
        }

        const fullPath = path.join(__dirname, '..', folder);
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        // Create unique filename: timestamp-randomstring-originalname
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const basename = path.basename(file.originalname, ext).replace(/\s/g, '-');
        const filename = `${basename}-${uniqueSuffix}${ext}`;
        cb(null, filename);
    }
});

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
        cb(null, true);
    } else {
        cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed'));
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: fileFilter
});

// Single file upload
const uploadSingle = (fieldName) => upload.single(fieldName);

// Multiple files upload
const uploadMultiple = (fieldName, maxCount) => upload.array(fieldName, maxCount);

// Upload fields
const uploadFields = (fields) => upload.fields(fields);

module.exports = {
    upload,
    uploadSingle,
    uploadMultiple,
    uploadFields
};