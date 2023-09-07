const mysql = require('mysql');

// MySQL database configuration
const dbConnection = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'pokemonWeb'
});

// Create the 'pokemon' database
// dbConnection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to MySQL:', err);
//         return;
//     }

//     dbConnection.query('CREATE DATABASE IF NOT EXISTS pokemon', (error) => {
//         if (error) {
//             console.error('Error creating the database:', error);
//             dbConnection.end();
//             return;
//         }

//         console.log('Database "pokemon" created (if it did not already exist)');
//         dbConnection.changeUser({ database: 'pokemon' }, (err) => {
//             if (err) {
//                 console.error('Error changing to "pokemon" database:', err);
//                 dbConnection.end();
//                 return;
//             }

//             // Create the 'pokemon_data' table
//             const createTableQuery = `
//             CREATE TABLE pokemonWeb.pokemonList (id INT(255) NOT NULL , 
//             name VARCHAR(255) NOT NULL , 
//             type1_id VARCHAR(255) NOT NULL , 
//             type2_id VARCHAR(255) NULL DEFAULT NULL , 
//             sprite VARCHAR(255) NOT NULL , 
//             baseHP INT(20) NOT NULL DEFAULT '1' , 
//             baseAttack INT(20) NOT NULL DEFAULT '1' , 
//             baseDefense INT(20) NOT NULL DEFAULT '1' , 
//             baseSAttack INT(20) NOT NULL DEFAULT '1' , 
//             baseSDefense INT(20) NOT NULL DEFAULT '1' , 
//             baseSpeed INT(20) NOT NULL DEFAULT '1' , 
//             height INT(255) NOT NULL DEFAULT '1' , 
//             weight INT(255) NOT NULL DEFAULT '1' , 
//             price INT(255) NOT NULL DEFAULT '0' , 
//             PRIMARY KEY (id)) ENGINE = InnoDB CHARSET=utf8mb4 COLLATE utf8mb4_general_ci;
//             `;

//             dbConnection.query(createTableQuery, (err) => {
//                 if (err) {
//                     console.error('Error creating the table:', err);
//                 } else {
//                     console.log('Table "pokemon_data" created (if it didn\'t already exist)');
//                 }

//                 // Close the database connection
//                 dbConnection.end();
//             });
//         });
//     });
// });

module.exports = dbConnection;
