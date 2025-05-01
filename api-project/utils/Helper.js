const path = require('path');
const fs = require('fs/promises');

exports.removeImage = async (imageName) => {
  try {
    const imagePath = path.join('./storage/images', imageName);
    await fs.unlink(imagePath);
  } catch (error) {
    throw error;
  }
}