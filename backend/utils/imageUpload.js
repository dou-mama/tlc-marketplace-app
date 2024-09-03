const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    // Define the destination directory where files should be stored
    destination: function (req, file, next) {
      next(null, 'uploads/'); // Save files to the 'uploads/' directory
    },
    // Define the filename
    filename: function (req, file, next) {
      // Use a unique suffix to prevent overwriting files with the same name
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      // Combine the unique suffix with the original file extension
      next(null, uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  const upload = multer({ storage: storage });

  module.exports = upload;

  