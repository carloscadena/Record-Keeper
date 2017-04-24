'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const cors = require('cors');

//const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5400;
const app = express();
const conString = 'postgres://william:test@localhost:5432/kilovolt';
const client = new pg.Client(conString);
// let testing = 0;

client.connect();
client.on('error', function(error) {
  console.error(error);
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));
app.use(cors());


app.get('/groups', (request, response) => {
  client.query(`SELECT DISTINCT group_name FROM groups;`)
  .then(result => response.send(result.rows))
  .catch(console.error);
});
// app.post('/')

app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}!`));


// ------- SEED database while in development ------ //
function loadUsers() {
  fs.readFile('./data/users.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO users(user_name) VALUES($1)`,
        [ele.user]
      )
      .catch(console.error);
    });
  });
}
function loadGames() {
  fs.readFile('./data/games.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO games(winner_id, loser_id) VALUES( (SELECT id FROM users WHERE user_name = '${ele.winner}'),
          (SELECT id FROM users WHERE user_name = '${ele.loser}') );`
      )
      .catch(console.error);
    });
  });
}

function loadGroups() {
  fs.readFile('./data/groups.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO groups(group_name, user_id) VALUES( '${ele.group}', (SELECT id FROM users WHERE user_name = '${ele.user}') );`
      )
      .catch(console.error);
    });
  });
}

function loadDB() {
  client.query(
    `DROP TABLE IF EXISTS groups; DROP TABLE IF EXISTS games; DROP TABLE IF EXISTS users;`
  )

  client.query(
    `CREATE TABLE IF NOT EXISTS
    users (
      id SERIAL PRIMARY KEY,
      user_name VARCHAR(50)
    );`
  )
  .then(loadUsers)
  .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS
    games (
      id SERIAL PRIMARY KEY,
      winner_id INTEGER NOT NULL REFERENCES users(id),
      loser_id INTEGER NOT NULL REFERENCES users(id),
      date DATE DEFAULT NOW()
    );`
  )
  .then(loadGames)
  .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS
    groups (
      user_id INT REFERENCES users(id),
      group_name VARCHAR(50)
    );`
  )
  .then(loadGroups)
  .catch(console.error);
}

loadDB();
