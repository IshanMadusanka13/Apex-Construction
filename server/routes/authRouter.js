const express = require('express');
const routera = express.Router();
const authController = require('../Controllers/authController');

routera.get('/auths', authController.getAuth);
routera.post('/createauth', authController.addAuth);
routera.post('/updateauth', authController.updateAuth);
routera.post('/deleteauth', authController.deleteAuth);

module.exports = routera;