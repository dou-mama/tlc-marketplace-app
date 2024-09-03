const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const pool = require('./../db');
const sendEmail = require('./../utils/email');
const User = require('./../models/userModel');
const userService = require('./../services/userService');
const {promisify} = require('util');
const AppError = require('./../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = id => {
    return jwt.sign({ id: id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
};

const createSendToken = (user, statusCode, res) => {
    
    const token = signToken(user.id);

    const cookieOptions = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
        secure: true, //only sent through https
        sameSite: 'None',
        httpOnly: true, //can't be modified by browser
    }
    // if(process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions)

    delete user.password;
    delete user.passwordResetToken;
    delete user.passwordResetExpires;

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
}

exports.register = async(req, res, next) => {
    const errors = validationResult(req);
    //if validation errors return error code
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {username, password, full_name, email} = req.body;

    try{
        const newUser = await User.createUser(full_name, username, password, email);
        createSendToken(newUser, 201, res);
        // res.status(201).json({ message: 'User registered successfully',  newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
}

exports.login = async(req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
        const {username, password} = req.body;

        const currentUser = await User.findUserSecure({fields: ['username'], operators: ['='], values: [username]});
        // console.log(currentUser);
        if(!currentUser){
            return res.status(400).json({ message: 'Invalid username' });
        }
        //check if password is correct
        const isMatch = await bcrypt.compare(password, currentUser.password);
        if(!isMatch){
            return res.status(400).json({ message: 'Invalid password' });
        }
        createSendToken(currentUser, 200, res);
    } catch(error) {
        res.status(500).json({ message: 'Error logging in ' + error});
    }
}

exports.blacklist = async(req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        await User.blacklist(token);
        return res.status(204).json({message: 'You have been successfully logged out'});
    } catch(err){
        return res.status(500).json({ message: 'Error logging out ' + err});
    }
}

exports.logout = (req, res) => {
    try{
        const cookieOptions = {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN*24*60*60*1000),
            //secure: true, //only sent through https
            httpOnly: true //can't be modified by browser
        }
        res.clearCookie('jwt', cookieOptions);
        res.json({ message: 'Logout successful' });
    } catch(err){
        return res.status(500).json({message: 'error logging out: ' + err});
    }
}

// exports.isLoggedIn = 

exports.updatePassword = async(req, res, next) => {

    // 1) Get user
    const user = await User.findUserSecure(req.body.username);
    if(!user){
        return next(new AppError('Invalid username', 401));
    }

    // 2) Compare passwords
    const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
    if(!passwordsMatch){
        return next(new AppError('Invalid password', 401));
    }

    // 3) If all good update the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const update = User.updatePassword(user.username, hashedPassword);

    //4) Log user in, send jwt
    delete user.password;
    createSendToken(user, 200, res);
}

exports.resetPassword = async (req, res, next) => {

    try{

        // 1) Get user based on the token
        const encryptedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

        const user = await User.findUserSecure({fields: ['passwordresettoken', 'passwordresetexpires'], operators: ['=', '>='], values: [encryptedToken, new Date(Date.now())]});
    
        if(!user) return next(new AppError('Password reset token has expired', 404));

        // 2) update the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const update = User.updatePassword(user.username, hashedPassword);

        // 3) log the user in and send back jwt
        createSendToken(user, 200, res);

    } catch(err){
        return next(new AppError('Unknown error while resetting password ' + err, 404));
    }

}

exports.forgotPassword = async (req, res, next) => {

    try{

        // 1) Get user based on posted email
        const {email} = req.body;
        const user = User.findUser({fields: ['email'], operators: ['='], values: [req.body.email]});
        if(!user) return next(new AppError('This user does not exist ', 404));

        // 2) Generate random reset token
        const resetFields = userService.createPasswordResetToken();
        const params = [req.body.email, resetFields[1], resetFields[2]];

        // 3). Write it to the database
        let result = await User.issuePasswordResetToken(params);

        console.log("Result after issuing token: ");
        console.log(result);

        // 4). send to user's email
        const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetFields[0]}`;
        const message = `Forgot your password? Submit a PATCH request with your password and 
        passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email`;

        try{
        
            await sendEmail({
                email: email,
                subject: 'Your password reset token (valid for 10 mins)',
                message
            });
        
            res.status(200).json({
                status: 'success',
                message: 'Token sent to email'
            });

        } catch(err){
            //reset password reset token in case of error
            // user.passwordResetToken = undefined;
            // user.passwordResetExpires = undefined;
            // await user.save({validateBeforeSave: false});
            // console.log(err);

            return next(new AppError('There was an error sending the email. Try again later', 500));
        }
} catch(err){
    return next(new AppError('Unknown error in forgot password ' + err, 404));
}

}

exports.protect = async (req, res, next) => {
    try {
        console.log('in protect from logout');
        let token;

        // 1). Getting token and check if it exists
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        } 
        else if(req.cookies.jwt){
            token = req.cookies.jwt;
        }
        else{
            return next(new AppError('You are not logged in! Please log in to get access', 401))
        }

        // 2) Check if token has been blacklisted
        const res = await User.checkBlacklist(token);
        if(res){
            return next(new AppError('Token is invalid. Log in again.'));
        }

        // 2) Token verification: check if token has been manipulated or has expired
        
        const decodedPayload = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        // 3) Check if user still exists
        const user = await User.findUserSecure({fields: ['id'], operators: ['='], values: [decodedPayload.id]});
        if(!user){
            return next(new AppError('This user has been deleted', 401));
        }

        // 4) Check if user changed password after the token was issued
        // if(user.changedPasswordAfter(decodedPayload.iat)){
        //     return next(new AppError('User recently changed password.', 401));
        // }

        // //Add user object to the req
        req.user = user;

        // Grant access to protected route
        next();
    } catch(err){
        return next(new AppError('Error: ' + err, 500))
    }
};

