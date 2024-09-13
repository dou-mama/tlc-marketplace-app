const pool = require('./../db')
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');


exports.createPost = async(userId, postObject, imagePath) => {
    const {textcontent, rent, title, year, make} = postObject;
    const result = await pool.query(
        'INSERT INTO posts(textcontent, userid, rent, title, year, make, imagepath) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [textcontent, userId, rent, title, year, make, imagePath]
    )
    return result.rows[0];
}

exports.getUserPosts = async(userId) => {
    const result = await pool.query(
        'SELECT textcontent FROM posts WHERE userid = $1',
        [userId]
    )
    return result.rows[0];
}

exports.getPost = async(postId) => {
    const result = await pool.query(
        'SELECT * FROM posts where id = $1',
        [postId]
    )
    return result.rows[0];
}

exports.getAllPosts = async() => {
    const result = await pool.query(
        'SELECT * FROM POSTS'
    )
    return result.rows;
}

exports.storeImage = async(postId, imagePath) => {
    const result = await pool.query(
        'UPDATE posts SET imagepath = $1 WHERE id = $2',
        [imagePath, postId]
    )
    return result.rows[0]
}
