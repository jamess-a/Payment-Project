const express = require('express');
const { register, login , Admin_login , show , transaction , showlogs} = require('../controllers/authController');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin_login', Admin_login);
router.get('/show', show);
router.post('/transaction', transaction);
router.get('/showlogs' , showlogs);


module.exports = router;