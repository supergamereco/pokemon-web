const axios = require('axios');
const mysql = require('mysql');
const async = require('async');

// MySQL database configuration
const db = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root', // Replace with your MySQL username
    password: 'root', // Replace with your MySQL password
    database: 'pokemonWeb',
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
});

async function fetchAndInsertPokemonData(startId, endId) {
    const pokemonData = [];

    // Fetch data for all Pokémon in parallel
    const tasks = Array.from({ length: endId - startId + 1 }, (_, index) => startId + index).map((id) => (callback) => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then((response) => {
                const pokemon = response.data;
                const types = pokemon.types.map((type) => type.type.name);
                let price = Math.floor(Math.random() * 9999);
                console.log(price);
                pokemonData.push([
                    pokemon.id,
                    pokemon.name,
                    types[0] || null,
                    types[1] || null,
                    pokemon.sprites.front_default,
                    pokemon.stats[0].base_stat,
                    pokemon.stats[1].base_stat,
                    pokemon.stats[2].base_stat,
                    pokemon.stats[3].base_stat,
                    pokemon.stats[4].base_stat,
                    pokemon.stats[5].base_stat,
                    pokemon.height,
                    pokemon.weight,
                    price
                ]);

                console.log(`Fetched data for Pokemon #${pokemon.id}: ${pokemon.name}`);
                callback();
            })
            .catch((error) => {
                console.error(`Error fetching data for Pokemon #${id}:`, error);
                callback(error);
            });
    });

    try {
        // Execute all tasks in parallel with a concurrency limit of 10
        await async.parallelLimit(tasks, 10);

        // Bulk insert the fetched Pokémon data into the database
        const insertQuery = `
            INSERT INTO pokemonList (id, name, type1_id, type2_id, sprite, baseHP, baseAttack, baseDefense,
                baseSAttack, baseSDefense, baseSpeed, height, weight, price)
            VALUES ?`;

        db.query(insertQuery, [pokemonData], (error, results) => {
            if (error) {
                console.error('Error inserting data into the database:', error);
            } else {
                console.log('Inserted data into the database');
            }

            // Close the database connection
            db.end();
        });
    } catch (error) {
        console.error('Error in parallel tasks:', error);
        // Close the database connection in case of an error
        db.end();
    }
}

// Specify the range of Pokémon IDs you want to fetch and insert
const startId = 1;
const endId = 1010;
fetchAndInsertPokemonData(startId, endId);
