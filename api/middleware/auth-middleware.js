module.exports = {
  validateSessionLoggedIn,
  validateUserByBody,
};

function validateSessionLoggedIn(req, res, next) {
  // There is only a user in the session when there was a successful login
  if (req.session && req.session.user) {
    next();
  } else {
    res
      .status(401)
      .json({ message: 'Please first login before accessing our services.' });
  }
}

function validateUserByBody(req, res, next) {}
