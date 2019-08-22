const express = require('express');
const router = express.Router();

// Database
const DB = require('../data/db.js'); // change to point to database

//#region - CREATE 

// Creates resource using the information sent inside the request body.
router.post('/', validateInput, async (req, res, next) => {

});
//#endregion

//#region - READ

// Read All - Returns an array of all
router.get('/', async (req, res, next) => {

});

// Read by ID - Returns the object with the specified id.
router.get('/:id', validateById, (req, res, next) => {

});

//#endregion

//#region - UPDATE 

// 	Updates the specified id using data from the request body. 
router.put('/:id', validateById, async (req, res, next) => {

});
//#endregion

//#region - DELETE 

// Deletes Project by ID
router.delete('/:id', validateById, async (req, res, next) => {

});
//#endregion


//#region - Custom Middleware

async function validateById(req, res, next) {
  const { id } = req.params

};

function validateInput(req, res, next) {
  const { body } = req


};

//#endregion

module.exports = router;