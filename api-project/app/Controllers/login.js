const RESPONSE = { status: 'success' };

exports.login = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'Login Successfully.';

  return res.status(200).json(RESPONSE);
}

exports.forgotPassword = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'Send an email to reset password.';

  return res.status(200).json(RESPONSE);
}

exports.resetPassword = (req, res, next) => {
  // console.log(req);

  RESPONSE.message = 'Reset password successfully.';

  return res.status(200).json(RESPONSE);
}