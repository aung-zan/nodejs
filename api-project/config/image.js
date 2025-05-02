const multer = require('multer');

const imageTypes = [
  'image/png', 'image/jpg', 'image/jpeg'
];

// Image storage config.
const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'storage/images');
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + ':' + Math.round(Math.random() * 1E9);
    cb(null, uniquePrefix + '-' + file.originalname)
  }
});

// Image validation.
const filter = (req, file, cb) => {
  if (! file.mimetype.startsWith('image/')) {
    return cb(new Error('Only image files are allowed'), false);
  }

  if (! imageTypes.includes(file.mimetype)) {
    return cb(new Error('Allowed images types: pgn, jpg and jpeg'), false);
  }

  return cb(null, true);
}

// Multer config for image upload.
const imageUpload = multer({
  storage: diskStorage,
  fileFilter: filter
});

module.exports = { imageUpload };