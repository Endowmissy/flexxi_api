const express = require('express');
const { register } = require('../controllers/register');
const { signIn } = require('../controllers/login');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: "Welcome to Flexxi Products" });
  });

router.post('/register', register);
router.post('/login', signIn)

module.exports = router;
