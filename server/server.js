const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const dbConnection = require('./database');
const { body, validationResult } = require('express-validator');
const { register, login, buyPokemon, fetchUserData, fetchUsersPokemon  } = require('./serverModule');

const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(express.json());
// Connect to the database
dbConnection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

// REST API endpoint to get Pokémon data by ID
app.get('/pokemon/:id', (req, res) => {
    const pokemonId = req.params.id;

    // Fetch Pokémon data from the database by ID
    dbConnection.query('SELECT * FROM pokemonList WHERE id = ?', [pokemonId], (error, results) => {
        if (error) {
            console.error('Error fetching data from the database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Pokémon not found' });
            } else {
                res.json(results[0]);
            }
        }
    });
});

// REST API endpoint to get all Pokémon data
app.get('/pokemon', (req, res) => {
    // Fetch all Pokémon data from the database
    dbConnection.query('SELECT * FROM pokemonList', (error, results) => {
        if (error) {
            console.error('Error fetching data from the database:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
        }
    });
});

app.post('/register', (req, res) => {
    register(req, res, dbConnection);
});
  
app.post('/login', (req, res) => {
    login(req, res, dbConnection);
});

app.get('/userspokemon', (req, res) => {
    fetchUsersPokemon(req, res, dbConnection);
});

app.post('/fetchUserData', (req, res) => {
    fetchUserData(req, res, dbConnection);
});

app.post('/buyPokemon', (req, res) => {
    const userId = req.body.userid;
    const pokemonId = req.body.pokemonid;
  
    buyPokemon(userId, pokemonId, dbConnection, (error, updatedCash) => {
      if (error) {
        res.status(400).json({ error: error });
      } else {
        res.status(200).json({ updatedCash: updatedCash });
      }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
