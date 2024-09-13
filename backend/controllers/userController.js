// const User = require('./../models/userModel');

const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const userModel = require('./../models/userModel');
// const userService = require('./../services/userService')

exports.createUser = async (req, res, next) => {
    try{
        const result = await userModel.createUser(req, res, next);
        res.status(201).json(result.rows[0]);
    } catch(err){
        console.log('error in user controller: ', err);
    }
}

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const result = userModel.getAllUsers(req, res, next);
})

exports.deleteUser = catchAsync(async (req, res, next) => {
    console.log(req.body.id);
    const result = await userModel.deleteUser(req.body.id);
    if(!result) return next(new AppError('user not found', 404));
    res.status(204).json({
        status: 'success',
        data: null
    })
})