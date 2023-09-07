const dbConnection = require('./database');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors'); 
const jwt = require('jsonwebtoken');

// Middleware to parse JSON requests
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Register route
function register(req, res, dbConnection) {
  const { username, email, password } = req.body;
  console.log(req.body);

  // Insert user data into the 'users' table
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

  // Wrap the database operation in a Promise
  new Promise((resolve, reject) => {
    dbConnection.query(query, [username, email, password], (err, results) => {
      if (err) {
        console.error('Registration error:', err);
        reject(err);
      } else {
        console.log('Success!!');
        resolve(results);
      }
    });
  })
    .then(() => {
      res.status(201).json({ username: username });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Registration failed' });
    });
}

// Login route
function login(req, res, dbConnection) {
  const { email, password } = req.body;

  // Check if the user exists in the 'users' table
  const query = 'SELECT * FROM users WHERE email = ?';

  // Wrap the database operation in a Promise
  new Promise((resolve, reject) => {
    dbConnection.query(query, [email], (err, results) => {
      if (err) {
        console.error('Login error:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  })
    .then((results) => {
      if (results.length === 0) {
        res.status(401).json({ message: 'User not found' });
      } else {
        const user = results[0];
        // Check if the password matches
        if (user.password === password) {
          const token = jwt.sign(
            { userid: user.id, username: user.username, cash: user.cash },
            '3tR#7pB*9jV$W5sZ', // Replace with a secure secret key
            { expiresIn: '1h' }
          );

          // Set the token as a cookie
          res.cookie('authToken', token, { httpOnly: true, secure: false });
          res.status(200).json({ userid: user.id, username: user.username, cash: user.cash });
        } else {
          res.status(401).json({ message: 'Incorrect password' });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Login failed' });
    });
}

// Function to buy a Pokémon
function buyPokemon(userId, pokemonId, dbConnection, callback) {
  // Start a database transaction
  console.log(userId);
  dbConnection.beginTransaction((transactionError) => {
    if (transactionError) {
      return callback(transactionError);
    }

    // Step 1: Retrieve the user's cash
    const getUserCashQuery = 'SELECT cash FROM users WHERE id = ? FOR UPDATE';
    dbConnection.query(getUserCashQuery, [userId], (userError, userResults) => {
      if (userError) {
        console.log("error1");
        return dbConnection.rollback(() => callback(userError));
      }

      if (userResults.length === 0) {
        console.log("error2");
        return dbConnection.rollback(() => callback('User not found'));
      }

      const userCash = userResults[0].cash;

      // Step 2: Retrieve the Pokémon's price
      const getPokemonPriceQuery = 'SELECT price FROM pokemonList WHERE id = ?';
      dbConnection.query(getPokemonPriceQuery, [pokemonId], (pokemonError, pokemonResults) => {
        if (pokemonError) {
          console.log("error3");
          return dbConnection.rollback(() => callback(pokemonError));
        }

        if (pokemonResults.length === 0) {
          console.log("error4");
          return dbConnection.rollback(() => callback('Pokémon not found'));
        }

        const pokemonPrice = pokemonResults[0].price;

        // Step 3: Compare user's cash with Pokémon's price
        if (userCash < pokemonPrice) {
          console.log("error4");
          return dbConnection.rollback(() => callback('Not enough cash to buy this Pokémon'));
        }

        // Step 4: Deduct the price from user's cash and update the database
        const updatedCash = userCash - pokemonPrice;
        const updateUserCashQuery = 'UPDATE users SET cash = ? WHERE id = ?';
        dbConnection.query(updateUserCashQuery, [updatedCash, userId], (updateError, updateResults) => {
          if (updateError) {
            console.log("error5");
            return dbConnection.rollback(() => callback(updateError));
          }

          if (updateResults.affectedRows === 0) {
            console.log("error6");
            return dbConnection.rollback(() => callback('Failed to update user cash'));
          }
          // Step 5: Query Pokemon data
          dbConnection.query('SELECT * FROM pokemonList WHERE id = ?', [pokemonId], (error, results) => {
            if (error) 
              console.error('Error fetching data from the database:', error);
            else if (results.length === 0)
              console.error('Pokémon not found', error);
            const pokemonData = results[0];
            // Step 6: Add the purchased Pokémon to the pokemons table
            const addPokemonQuery = 'INSERT INTO pokemons (name, pokedexID, level, userid, price, sprite) VALUES (?, ?, ?, ?, ?, ?)';
            dbConnection.query(addPokemonQuery, [pokemonData.name, pokemonData.id, 1, userId, pokemonPrice, pokemonData.sprite], (addPokemonError, addPokemonResults) => {
              if (addPokemonError)
                return dbConnection.rollback(() => callback(addPokemonError));
              
              console.log(addPokemonResults);
              // Commit the transaction if everything is successful
              dbConnection.commit((commitError) => {
                if (commitError)
                  return dbConnection.rollback(() => callback(commitError));

                return callback(null, updatedCash); // Successfully updated cash, added Pokémon, and committed the transaction
              });
            });
          });
        });
      });
    });
  });
}

function fetchUserData(req, res, dbConnection) {
  const { userid } = req.body;

  // Check if the user exists in the 'users' table
  const query = 'SELECT * FROM users WHERE id = ?';

  // Wrap the database operation in a Promise
  new Promise((resolve, reject) => {
    dbConnection.query(query, [userid], (err, results) => {
      if (err) {
        console.error('fetch user data error:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  })
    .then((results) => {
      if (results.length === 0) {
        res.status(401).json({ message: 'User not found' });
      } else {
        const user = results[0];
        const token = jwt.sign(
          { userid: user.id, username: user.username, cash: user.cash },
          '3tR#7pB*9jV$W5sZ', // Replace with a secure secret key
          { expiresIn: '1h' }
        );

        // Set the token as a cookie
        res.cookie('authToken', token, { httpOnly: true, secure: false });
        res.status(200).json({ userid: user.id, username: user.username, cash: user.cash });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'fetch user dat failed' });
    });
}

function fetchUsersPokemon(req, res, dbConnection) {
  const { userid } = req.body;
  console.log('api called');
  // Check if the user exists in the 'users' table
  const pokemonidQuery = 'SELECT pokedexID FROM pokemons WHERE userid';

  // Wrap the database operation in a Promise
  new Promise((resolve, reject) => {
    dbConnection.query(pokemonidQuery, [userid], (err, results) => {
      if (err) {
        console.error('fetch users pokemon error:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  })
    .then((results) => {
      if (results.length === 0) {
        res.status(401).json({ message: 'Pokemon not found' });
      } else {
        res.status(200).json(results);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'fetch users pokemon failed' });
    });
}

module.exports = {
  register,
  login,
  buyPokemon,
  fetchUserData,
  fetchUsersPokemon
};
