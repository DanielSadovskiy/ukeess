const express = require('express');
const router = express.Router();
var depsController = require('../controllers/departments.controller');

router.get('/getdepartments', depsController.getDepartments);
router.get('/getdepartmentscount', depsController.getDepartmentsCount);

router.post('/createdep', depsController.createDepartment);

router.delete('/deletedep', depsController.deleteDepartment);

router.put('/updatedep', depsController.updateDepartment);
module.exports = router;
