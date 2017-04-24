'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
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

// app.get('/group', (request, response) => {
//   client.query(`
//     SELECT * FROM groups
//     INNER JOIN authors
//       ON articles.author_id=authors.author_id;`
//   )
//   .then(result => response.send(result.rows))
//   .catch(console.error);
// });
// app.post('/')

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));


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

function loadDB() {
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
}

loadDB();
