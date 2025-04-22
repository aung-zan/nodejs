const path = require("path");
const fs = require("fs/promises");

const getMaxId = (records) => {
  if (records.length <= 0) {
    return 0;
  }

  const ids = [];
  records.forEach(record => {
    ids.push(record.id);
  });

  return Math.max(...ids);
}

const delay = () => {
  return new Promise(resolve => {
    setTimeout(resolve, 5000);
  });
}

const deleteImage = async (imageName) => {
  const imagePath = path.join("./public/images/", imageName);

  return await fs.unlink(imagePath);
}

module.exports = { getMaxId, delay, deleteImage };