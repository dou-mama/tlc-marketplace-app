const catchAsync = require('./../utils/catchAsync')
const pool = require('./../db');
const crypto = require('crypto')

exports.createPasswordResetToken = () => {
    const randBytes = crypto.randomBytes(32).toString('hex');

    //encrypt reset token
    const resetToken = crypto.createHash('sha256')
    .update(randBytes).digest('hex');

    //expires in 10 minutes
    const passwordResetExpires = new Date(Date.now() + (24*60*10*60*1000));
    // console.log(passwordResetExpires);

    //return the plaintext reset token
    return [randBytes, resetToken, passwordResetExpires];
}

















// exports.createUser = async (req, res, next) => {
//     const {full_name, username} = req.body;
//     try{
//         const result = await pool.query(
//             'INSERT INTO users (full_name, username) VALUES ($1, $2) RETURNING *',
//             [full_name, username]
//             );
//         return result;
//     } catch (err) {
//         console.error('error creating user', err);
//         // process.exit(1);
//       }
//     }

// exports.getAllUsers = catchAsync(async (req, res, next) => {
//     try{
//         const result = await pool.query(
//             'Select * from users'
//         );
//         const data = result.rows;
//         res.status(200).json({
//             status: 'success',
//             data: {
//                 data
//             }
//         })
//         return result.rows;
//     } catch(err){
//         console.log('error fetching users', err);
//     }
// })

