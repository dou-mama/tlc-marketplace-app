const { Router } = require('express');
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const postController = require('./../controllers/postController');
const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const upload = require('./../utils/imageUpload')

router.route('/').post(authController.protect, upload.single('image'), postController.createPost).get(postController.getAllPosts);
// router.route('/:id').get(authController.protect, postController.getUserPosts);
router.route('/:id').get(postController.getPost)
router.route('/upload').post(upload.single('image'), postController.storeImage);

module.exports = router;