'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
//const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
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
app.use(express.static('./public'));

app.get('/', (request, response) => response.sendFile('index.html', {root: '.'}));
// app.post('/')

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));


// ------- SEED database while in development ------ //
function loadUsers() {
  fs.readFile('./public/data/users.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO users(user_name, groups, wins, losses, games_played) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
        [ele.user, ele.groups, ele.wins, ele.losses, ele.games_played]
      )
      .catch(console.error);
    });
  });
}
function loadGames() {
  fs.readFile('./public/data/games.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO
            games(winner, loser, winner_score, loser_score)
            VALUES(SELECT, SELECT, $1, $2)SELECT author_id, $1, $2, $3, $4
            FROM authors
            WHERE author=$5;`,
        [ele.user, ele.groups, ele.wins, ele.games_played]
      )
      .catch(console.error);
    });
  });
}
function loadDB() {
  client.query(
    `CREATE TABLE IF NOT EXISTS
    users (
      user_id SERIAL PRIMARY KEY,
      user_name VARCHAR(50),
      groups TEXT[],
      wins INT,
      games_played INT
    );`
  )
  .then(loadUsers)
  .catch(console.error);
  // TODO Create new table where games are rows and p1, p2 and date are fields
  client.query(`
    CREATE TABLE IF NOT EXISTS
    games (
      game_id SERIAL PRIMARY KEY,
      winner INTEGER NOT NULL REFERENCES users(user_id),
      loser INTEGER NOT NULL REFERENCES users(user_id),
      winner_score INT NOT NULL,
      loser_score INT NOT NULL,
      date DATE DEFAULT GETDATE()
    );`
  )
  .then(loadGames)
  .catch(console.error);
}

loadDB();
