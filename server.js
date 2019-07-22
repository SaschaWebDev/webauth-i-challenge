const express = require('express');
const helmet = require('helmet');
const moment = require('moment');

const server = express();

server.get('/', (req, res) => {
  res.send(
    `<h2>Welcome to the API of sprint 13 lecture 1 daily challenge</h2>`,
  );
});

server.use(Requestlogger);
server.use(express.json());
server.use(helmet());

function Requestlogger(req, res, next) {
  console.log(
    `${req.method} to http://localhost/5000${req.path} at `,
    moment().format(),
  );
  next();
}

module.exports = server;
