const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/auth')

const ContactController = require('../controllers/ContactController');
const userController = require('../controllers/userController');
const BookingController = require('../controllers/BookingController');
const CourseController = require('../controllers/CourseController');


router.get('/contact', ContactController.display);
router.post('/contact/create',ContactController.create);
router.get('/contact/view/:id',ContactController.view);
router.put('/contact/update/:id',ContactController.update);
router.delete('/contact/delete/:id',ContactController.delete)

//course
router.get('/course',CourseController.display)
router.post('/course/create',CourseController.create)
 router.get('/course/view/:id',CourseController.view)
 router.put('/course/update/:id',CourseController.update)
 router.delete('/course/delete/:id',CourseController.delete)/
 

//user
router.post('/register',userController.register)
router.post('/login',userController.login)
router.get('/profile',checkAuth,userController.profile)
router.get('/logout',userController.logout)

// booking
router.post('/booking/create/:courseId',checkAuth,BookingController.createbooking)
router.get('/booking/mybookings',checkAuth,BookingController.getUserBookings)
router.get('/admin/booking',checkAuth,BookingController.getAllBookings)
 module.exports = router;