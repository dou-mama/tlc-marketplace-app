const app = require('./app');
const pool = require('./db');
const fs = require('fs');

async function run() {

  try {
    
    //execute simple query

    // const client = await pool.connect();

    // const query = 'INSERT INTO users (full_name, username, password, email) VALUES ($1, $2, $3, $4)';
    // const values = ['Test Name', 'testuser', 'testpassword', 'test@example.com'];

    // console.log(query, values)
    // const result = await client.query(query, values);

    // console.log('Connected to the database');
    // console.log('RESULT: ');
    // console.log(result);

    // const result = await pool.query('SELECT * FROM users');
    // console.log(result.rows);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const port = process.env.PORT;
    
    app.listen(port, () => {
        console.log(`App running on port ${port}..`);
    });

    const dir = './uploads';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
}

  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

run();

