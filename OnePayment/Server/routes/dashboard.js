const express = require('express');
const { getSummary , getlastestTransactions , getMostPopular , getTotalTransactions} = require("../controllers/dashboardCrotoller");

const router = express.Router();

router.get('/summary', getSummary);
router.get('/lastest-transactions', getlastestTransactions);
router.get('/most-popular', getMostPopular);
router.get('/total-transactions' , getTotalTransactions);

module.exports = router;
