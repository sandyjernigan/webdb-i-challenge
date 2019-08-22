const express = require('express');

// database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

//#region - READ

// Read All - Returns an array of all accounts
router.get('/', async (req, res) => {
  try {
    // SELECT * FROM accounts;
    const results = await db('accounts');
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    next({ code: 500, message: "The information could not be retrieved." });
  }
});


//#endregion

module.exports = router;