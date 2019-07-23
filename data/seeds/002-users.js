exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users')
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex('users').insert([
        {
          username: 'sascha',
          password: 'toosimple',
        },
        {
          username: 'hanne',
          password: 'plaintext',
        },
        {
          username: 'thiara',
          password: 'wownosecurity',
        },
      ]);
    });
};
