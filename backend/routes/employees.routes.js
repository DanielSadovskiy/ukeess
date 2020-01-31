const express = require('express');
const router = express.Router();
var emplController = require('../controllers/employees.controller');

router.get('/getemployees', emplController.getEmployees);
router.get('/getemployeescount', emplController.getEmployeesCount);

router.post('/createemployee', emplController.createEmployee);

router.delete('/deleteempl', emplController.deleteEmployee);

router.put('/updateempl', emplController.updateEmployee);
module.exports = router;
