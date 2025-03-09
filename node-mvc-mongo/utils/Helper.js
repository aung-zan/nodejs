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

exports.getMaxId = getMaxId;
exports.delay = delay;