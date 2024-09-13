const { Router } = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const routeRequirements = []

router.route('/').get(authController.protect, userController.getAllUsers).post(userController.createUser).delete(authController.protect, userController.deleteUser);
router.post('/register', [
    body('username').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('email').isEmail().withMessage('Please provide a valid email')
], authController.register);
router.post('/login', [
    body('username').notEmpty().withMessage('Username is required'),
    body('password').notEmpty().withMessage('Password is required')
], authController.login);
router.post('/logout', authController.protect, authController.logout);


router.patch('/updatePassword', [
    body('username').notEmpty().withMessage('Username is required!'),
    body('password').notEmpty().withMessage('Current password is required!'),
    body('newPassword').isLength({min: 8}).withMessage('Password must be at least 8 characters long')
], authController.updatePassword);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

module.exports = router;