// functions/create-account.js

const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nik25hil!!',
  database: 'mazemirage_db'
});

exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const { gamertag, password } = JSON.parse(event.body);

  // Validate gamertag and password here according to your criteria

  // Connect to the database and insert the new account
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO users SET ?', {gamertag, password}, (error, results, fields) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          statusCode: 200,
          body: JSON.stringify({ message: 'Account created successfully', results })
        });
      }
    });
  });
};
