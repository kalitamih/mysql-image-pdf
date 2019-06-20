const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'Mc1ETcHTA7',
  database: 'Mc1ETcHTA7',
  password: 'KC8TBbOIih',
});

connection.connect((err) => {
  if (err) {
    return console.error(`Error: ${err.message}`);
  }
  console.log('Connection to database is successfull');
  return null;
});

connection.end((err) => {
  if (err) {
    return console.error(`Error: ${err.message}`);
  }
  console.log('Connection is closed');
  return null;
});
