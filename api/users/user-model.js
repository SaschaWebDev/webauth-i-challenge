const db = require('../../data/db-config.js');

module.exports = {
  find,
  findById,
  add,
};

function find() {
  return db('users');
}

function findById(id) {
  return db('users')
    .where('id', id)
    .first()
    .then(user => (user ? user : null));
}

function add(user) {
  return db('users')
    .insert(user, 'id')
    .then(([id]) => this.findById(id));
}
