const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

// Router
const router = express.Router();

//#region - CREATE 

// Creates resource using the information sent inside the request body.
router.post('/', validateInput, async (req, res, next) => {
  try {
    const insertResults = await db('accounts').insert(req.body);

    // check that the resource was added
    if (insertResults) {
      try {
        const results = await db('accounts').where('id', insertResults[0]);
        res.status(201).json(results); // return HTTP status code 201 (Created)
      } catch (error) {
        console.log(error);
        next({ code: 404, message: "Added with no return." });
      }
    } else {
      next({ code: 404, message: "There was an error while saving the information." });
    }
  } catch (error) {
    console.log(error);
    next({ code: 500 });
  }
});
//#endregion

//#region - READ

// Read All - Returns an array of all accounts
router.get('/', async (req, res) => {
  try {
    // SELECT * FROM accounts;
    const results = await db('accounts');
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    next({ code: 500 });
  }
});

// Read by ID - Returns results for the specified id.
router.get('/:id', validateById, (req, res, next) => {
  res.status(200).json(req.results);
});

//#endregion

//#region - UPDATE 

// Updates the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', validateById, async (req, res, next) => {
  const { id } = req.params

  try {
    const updateResults = await db('accounts').where({ id }).update(req.body);

    if (updateResults) {
      try {
        const results = await db('accounts').where({ id });
        res.status(200).json(results); // return HTTP status code 201 (Created)
      } catch (error) {
        console.log(error);
        next({ code: 404, message: "Updated with no return." });
      }
    } else {
      next({ code: 404, message: "The project could not be found." });
    }
  } catch (error) {
    // If there's an error when updating the post:
    console.log(error);
    next({ code: 500, message: "The project information could not be modified." });
  }
});
//#endregion

//#region - DELETE 

// Deletes request by ID
router.delete('/:id', validateById, async (req, res, next) => {
  const { id } = req.params
  try {
    const deleteResults = await db('accounts').where({ id }).del();

    if (deleteResults === 1) {
      res.status(200).json({ message: 'Delete project was successful.' });
    } else if (deleteResults > 1) {
      next({ code: 404, message: `More than one project was removed. ${deleteResults} were removed.` });
    } else {
      next({ code: 404, message: "The project with the specified ID could not be removed. Check the ID." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    next({ code: 500, message: "The project could not be removed." });
  }
});
//#endregion

//#region - Custom Middleware

async function validateById(req, res, next) {
  const { id } = req.params
  try {
    // SELECT * FROM accounts WHERE id = req.params.id
    const results = await db('accounts').where({ id });

    // If object for the specified id is not found:
    if (!results || Object.keys(results).length === 0) {
      next({ code: 400, message: `Invalid Results for ID: ${id}`});
    } else {
      req.results = results;
      next();
    }
  } catch (error) {
    // If there's an error in retrieving results from the database:
    console.log(error);
    next({ code: 500 });
  }
};

function validateInput(req, res, next) {
  const { body } = req
  if (body) {
    req.body = body;
    next();
  } else {
      next({ code: 400, message: "Request is missing data." });
  }
};

//#endregion

module.exports = router;