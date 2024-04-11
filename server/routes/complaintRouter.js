const express = require('express');
const routerc = express.Router();
const complaintController = require('../Controllers/complaintController');

routerc.get('/complaints', complaintController.getComplaint);
routerc.post('/createcomplaint', complaintController.addComplaint);
routerc.post('/updatecomplaint', complaintController.updateComplaint);
routerc.post('/deletecomplaint', complaintController.deleteComplaint);

module.exports = routerc;