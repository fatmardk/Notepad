const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUser } = require('../Controller/userController');
const Authorization = require('../Controller/services/Authorization');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', Authorization.authorized, getUser);

module.exports = router;
