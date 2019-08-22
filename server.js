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

  switch (error.code) {
    case 400: errorMessage = "You made a Bad Request. " + error.message; break;
    case 401: errorMessage = "The request you made could not be found. " + error.message; break;
    case 402: errorMessage = "Payment is required. " + error.message; break;
    case 403: errorMessage = "You not authorized to perform the operation or the resource is unavailable. " + error.message; break;
    case 404: errorMessage = "The request you made could not be found. " + error.message; break;
    case 500: errorMessage = "The information could not be retrieved."; break;
    default:  errorMessage = "Oh my! " + error.message;
  }
  res.status(error.code).json({ 
    message: errorMessage
  });
});

module.exports = server;