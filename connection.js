const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Ronaldo7@1",
  database: "robogarden",
});

connection.connect((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Connected");
  }
});
module.exports = connection;
