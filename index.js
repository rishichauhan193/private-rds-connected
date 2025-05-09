// const express = require('express');
// const mysql = require('mysql2/promise');
// const axios = require('axios');
// const serverless = require('serverless-http');

// const app = express();

// const DB_CONFIG = {
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// };

// app.get('/', async (req, res) => {
//   let rdsStatus = 'Disconnected';
//   let internetStatus = 'No Internet';

//   // RDS connection check
//   try {
//     const conn = await mysql.createConnection(DB_CONFIG);
//     await conn.query('SELECT 1');
//     await conn.end();
//     rdsStatus = 'Connected';
//   } catch (err) {
//     rdsStatus = `Error: ${err.message}`;
//   }

//   // Internet check
//   try {
//     await axios.get('https://www.google.com');
//     internetStatus = 'Online';
//   } catch (err) {
//     internetStatus = `Error: ${err.message}`;
//   }

//   res.send(`
//     <h1>Lambda Health Check</h1>
//     <p><strong>RDS:</strong> ${rdsStatus}</p>
//     <p><strong>Internet:</strong> ${internetStatus}</p>
//   `);
// });

// module.exports.handler = serverless(app);

const mysql = require('mysql2/promise');
const axios = require('axios');

const DB_CONFIG = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

(async () => {
  let rdsStatus = 'Disconnected';
  let internetStatus = 'No Internet';

  // Check RDS connection
  try {
    const conn = await mysql.createConnection(DB_CONFIG);
    await conn.query('SELECT 1');
    await conn.end();
    rdsStatus = 'Connected to RDS';
  } catch (err) {
    rdsStatus = `RDS Connection Error: ${err.message}`;
  }

  // Check Internet
  try {
    await axios.get('https://www.google.com');
    internetStatus = 'Internet is Online';
  } catch (err) {
    internetStatus = `Internet Error: ${err.message}`;
  }

  console.log('===== Health Check Result =====');
  console.log(`RDS Status: ${rdsStatus}`);
  console.log(`Internet Status: ${internetStatus}`);
})();
