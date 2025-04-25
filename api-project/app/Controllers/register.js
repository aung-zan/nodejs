const RESPONSE = { status: 'success' };

exports.register = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'Successfully register.';

  return res.status(200).json(RESPONSE);
}