const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController.js');

// CRUD operations
router.get('/', studentController.getAllStudents);
router.get('/:email', studentController.getStudentByEmail);
router.get('/id/:id', studentController.getStudentById);
router.post('/', studentController.addStudent);
router.put('/:id', studentController.updateStudent);
router.delete('/:id', studentController.deleteStudent);

// Session routes
router.get('/:id/sessions/attended', studentController.getAttendedSessions);
router.get('/:id/sessions/enrolled', studentController.getEnrolledSessions);

// Payment route
router.get('/:id/payments', studentController.getPaymentDetails);

module.exports = router;
