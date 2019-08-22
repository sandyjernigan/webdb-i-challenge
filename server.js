const express = require('express');

// Express
const server = express();
server.use(express.json());

// Routers
const ApiRouter = require('./api/accounts.js');
server.use('/api/accounts', ApiRouter);

// Base Folder
server.get('/', (req, res) => {
  res.send(`<h2>Hello World!</h2>`)
});

server.use((error, req, res, next) => {
  let errorMessage = "Error occured: ";

  switch (error.code) {
    case 400: errorMessage = errorMessage + "You made a Bad Request. " + error.message;
      break;
    case 404: errorMessage = errorMessage + "You made a Bad Request. " + error.message;
      break;
    default: errorMessage = errorMessage + "Oh my! " + error.message;
  }
  res.status(error.code).json({ 
    message: errorMessage
  });
});

module.exports = server;