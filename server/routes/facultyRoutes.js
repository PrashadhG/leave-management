const express = require('express');
const router = express.Router();
const { updateFaculty, facultyDepartment } = require('../controllers/facultyController');

router.put('/update-faculty/:id', updateFaculty);
router.get('/faculty-department', facultyDepartment);

module.exports = router;
