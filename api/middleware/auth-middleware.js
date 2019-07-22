const bcrypt = require('bcryptjs');

const Users = require('../users/user-model.js');

module.exports = {
  validateGetUser,
  validatePostUser,
};

function validateGetUser(req, res, next) {
  const { username, password } = req.headers;

  if (username && password) {
    Users.findByUsername({ username })
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: 'Invalid credentials.' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json({ message: 'Please provide valid credentials.' });
  }
}

function validatePostUser(req, res, next) {}
