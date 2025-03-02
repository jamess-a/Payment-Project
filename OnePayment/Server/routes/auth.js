const express = require('express');
const { register, login , Admin_login , show } = require('../controllers/authController');


const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin_login', Admin_login);
router.get('/show', show);



module.exports = router;