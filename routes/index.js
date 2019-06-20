const express = require('express');

const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getMainPage);

router.post('/user', userController.postDisplayUsers);

module.exports = router;
