const express = require('express');
const bcrypt = require('bcryptjs');

const Users = require('./user-model.js');

const router = express.Router();

const AuthMiddleware = require('../middleware/auth-middleware.js');

// GET ALL USERS (Login Protected)
router.get('/', AuthMiddleware.validateSessionLoggedIn, async (req, res) => {
  Users.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.send(err));
});

router.post('/register', (req, res) => {
  let { username, password } = req.body;

  if (username && password) {
    const hash = bcrypt.hashSync(password, 12);
    password = hash;
    Users.add({ username, password })
      .then(newUser => {
        res.status(201).json(newUser);
      })
      .catch(error => {
        res.status(500).json(error);
      });
  } else {
    res.status(400).json('No Credentials');
  }
});

router.post('/login', (req, res) => {
  let { username, password } = req.body;

  Users.findByUsername(username)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        req.session.user = user;
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: 'Invalid credentials got submitted.' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(error => {
      if (error) {
        res.json({
          message: 'There was an error during the logout.',
        });
      } else {
        res.status(200).json({ message: 'Logout was successful!' });
      }
    });
  } else {
    res
      .status(200)
      .json({ message: 'Login did not happen. So logout is not necessary.' });
  }
});

module.exports = router;
