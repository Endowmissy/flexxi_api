const express = require('express');
const { register } = require('../controllers/register');
const { signIn } = require('../controllers/login');

const router = express.Router();

router.post('/register', register);
router.post('/login', signIn)

module.exports = router;
