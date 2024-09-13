const dotenv = require('dotenv');
const { Pool } = require('pg');
const fs = require('fs');

dotenv.config({path: './config.env'});

const pool = new Pool({
    host: process.env.ENDPOINT, // e.g., 'localhost'
    port: process.env.PORT,                 // default PostgreSQL port
    user: 'postgres',
    password: process.env.PASSWORD,
    database: process.env.DATABASE, 
    ssl: {
        // rejectUnauthorized: true,
        ca: fs.readFileSync(process.env.SSLPATH).toString(),
      },
  });

  

  module.exports = pool;