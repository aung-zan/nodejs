const RESPONSE = { success: true };

exports.index = (req, res, next) => {
  RESPONSE.message = 'Welcome to express api.';

  return res.status(200).json(RESPONSE);
}