const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Post = require('./../models/postModel');
const path = require('path');


exports.createPost = async(req, res, next) => {

    // const errors = validationResult(req);
    //if validation errors return error code
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }

    console.log("req.user: ");
    // console.log(req.user);

    // const {id} = req.user
    const id = 7
    // console.log(typeof id);
    // const {content, rent, title, year, make} = req.body;

    try{
        let imagePath = '';
        if(req.file) imagePath = req.file.path
        const newPost = await Post.createPost(id, req.body, imagePath);
        res.status(201).json({
            status: 'success',
            data: {
                newPost
            }
        })
    } catch(err){
        console.error(err);
        res.status(500).json({ message: 'Error creating post ' + err });
    }
}

exports.getAllPosts = async(req, res, next) => {
    try{
        const posts = await Post.getAllPosts();
        res.status(201).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch(err){
        res.status(500).json({ message: 'Error getting posts' });
    }
}

exports.getUserPosts = async(req, res, next) => {
    try{
        const posts = await Post.getUserPosts(req.params.userid);
        res.status(201).json({
            status: 'success',
            data: {
                posts
            }
        })
    } catch(err){
        res.status(500).json({ message: 'Error getting user posts' });
    }
}

exports.getPost = async(req, res, next) => {
    try{
        const post = await Post.getPost(req.params.id);
        res.status(201).json({
            status: 'success',
            data: {
                post
            }
        })
    } catch(err){
        res.status(500).json({ message: `Error getting post with id ${req.params.userid}: ${err}`});
    }
}

exports.storeImage = async(req, res, next) => {
    try {
        const postId = req.body.postId;
        const imagePath = req.file.path;

        const result = await Post.storeImage(postId, imagePath);

        res.status(201).json({
            status: 'success',
            data: {
                result
            }
        })
    } catch(err){
        res.status(500).json({ message: 'Error uploading image: ' + err });
    }
}

