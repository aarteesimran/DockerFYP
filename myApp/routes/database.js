// const mysql = require('mysql2');
// // var connection = mysql.createConnection({
// //     host: 'localhost',
// //     user: 'root',
// //     password: 'root',
// //     port: '3306',
// //     database: 'dockerizedcloudide'
// // });

// // connection.connect(function(err) {
// //     if (!err) {
// //         console.log("Database is connected ... nn");
// //     } else {
// //         console.log("Error connecting database ... nn");
// //     }
// // });
// const dbConnection = mysql.createPool({
//     host: 'localhost', // MYSQL HOST NAME
//     user: 'root', // MYSQL USERNAME
//     password: 'root',
//     database: 'dockerizedcloudide' // MYSQL DB NAME
// }).promise();
// console.log("DB Connected !!!")
//     //global.db = dbConnection;
// module.exports = dbConnection;