const RESPONSE = { status: 'success' };

exports.list = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'list function';

  return res.status(200).json(RESPONSE);
}

exports.store = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'store function';

  return res.status(201).json(RESPONSE);
}

exports.details = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'details function';

  return res.status(200).json(RESPONSE);
}

exports.update = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'update function';

  return res.status(200).json(RESPONSE);
}

exports.delete = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'delete function';

  return res.status(200).json(RESPONSE);
}