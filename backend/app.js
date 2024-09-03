const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRoutes');
const appError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const morgan = require('morgan');
const postRouter = require('./routes/postRoutes')

const corsOptions = {
    origin: 'http://localhost:4200', // Allow only this origin
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
    credentials: true
  };

app.use(cors(corsOptions));

app.use(morgan('dev'));

app.use(express.json({ limit: '10kb'}));

app.get('/', (req, res) => {
    console.log("in the backend");
    res.status(201).json({
        status: 'Hello from the backend',
        data: 'Hello'
    })
})
    // res.status('Hello from the Node.js back

app.use('/api/v1/users', userRouter);
app.use('/api/v1/listings', postRouter);
app.use('/uploads', express.static('uploads'));

app.use(globalErrorHandler);

module.exports = app;
