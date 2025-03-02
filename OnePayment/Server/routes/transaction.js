
const express = require('express');
const { qrcode , showlogs } = require('../controllers/transactionCrotroller');


const router = express.Router();

router.post('/QRPayment', qrcode);
router.get('/showlogs' , showlogs);



module.exports = router;