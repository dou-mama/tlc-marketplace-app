
// class User{

//     constructor(fullName, email, username, password, createdDatetime){
//         this.fullName = fullName;
//         this.email = email;
//         this.username = username;
//         this.password = password;
//         this.createdDatetime = createdDatetime;
//     }
// }
const pool = require('./../db')
const bcrypt = require('bcryptjs');
const AppError = require('../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const { openAsBlob } = require('fs');

exports.createUser = async(full_name, username, password, email) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
        'INSERT INTO users (full_name, username, password, email) VALUES ($1, $2, $3, $4) RETURNING full_name, username, email', 
        [full_name, username, hashedPassword, email]
    );
    return result.rows[0];
}

// exports.findUserByUsername = async (username) => {
//     const result = await pool.query(
//         'SELECT full_name, email FROM users WHERE username = $1',
//         [username]
//     );
//     return result.rows[0];
// };

// exports.findUserById = async (id) => {
//     const result = await pool.query(
//         'SELECT full_name, email FROM users WHERE id = $1',
//         [id]
//     );
//     return result.rows[0];
// }

exports.findUser = async(specs) => {
    const {fields, operators, values} = specs;
    let query = 'SELECT full_name, email FROM USERS WHERE ';
    fields.forEach((field, index) => {
        if(index+1 !== 1) query += 'AND ';
        query += `${field} ${operators[index]} $${index+1} `
    });
    const result = await pool.query(
        query,
        values
    );
    return result.rows[0]; 
}

exports.findUserSecure = async (specs) => {
    
    const {fields, operators, values} = specs;
    let query = 'SELECT * FROM USERS WHERE ';
    fields.forEach((field, index) => {
        if(index+1 !== 1) query += 'AND ';
        query += `${field} ${operators[index]} $${index+1} `
    });
    const result = await pool.query(
        query,
        values
    );
    return result.rows[0]; 

}

exports.updatePassword = async(username, newPassword) => {
    let result = await pool.query(
        'UPDATE users SET password = $1 WHERE username = $2',
        [newPassword, username]
    );
    
    //If update successful, update passwordChangedAt field
    if(result.rowCount == 1){
        result = await pool.query(
            'UPDATE users SET passwordchangedat = CURRENT_TIMESTAMP WHERE username = $1',
            [username]
        )
    }
    return result.rows[0];
}

exports.issuePasswordResetToken = async(params) => {
    try{
        const result = await pool.query(
            'UPDATE users SET passwordresettoken = $2, passwordresetexpires = $3 WHERE email = $1',
            params
        )
        
        return result.rows[0];
    } catch(err){
        return new AppError('Error while issuing reset token: ' + err, 404);
    }
}

exports.getAllUsers = async (req, res, next) => {
    console.log("in get all users");
    const result = await pool.query(
        'Select full_name, username, email from users'
        // 'Select * from users'
    );
    if(!result) return next(new AppError('error fetching all users', 400))
    const data = result.rows;
    res.status(200).json({
        status: 'success',
        data: {
            data
        }
    })
    return result;
}

exports.deleteUser = async(id) => {
    const result = await pool.query(
        'DELETE from users WHERE id=$1', [id]
    );
    // console.log(result);
    return result.rowCount;
}

exports.blacklist = async(token) => {
    const result = await pool.query(
        'INSERT INTO BLACKLIST (token) VALUES ($1)',
        [token]
    )
    return result.rowCount;
}

exports.checkBlacklist = async(token) => {
    const result = await pool.query(
        'SELECT * FROM BLACKLIST WHERE TOKEN = $1',
        [token]
    )
    return result.rowCount;
}



