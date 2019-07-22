const express = require('express');

const Users = require('./user-model.js');

const router = express.Router();

// GET ALL USERS
router.get('/', async (req, res) => {
  try {
    const projects = await Users.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({
      error:
        'There was an error finding all users. Sorry, that is on us!' + error,
    });
  }
});

module.exports = router;
