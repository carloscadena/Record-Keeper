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

function loadUsers() {
  fs.readFile('./public/data/table.json', (err, fd) => {
    JSON.parse(fd.toString()).forEach(ele => {
      client.query(
        `INSERT INTO users(user_name, groups, wins, games_played) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING`,
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
      user_name VARCHAR(50) UNIQUE NOT NULL,
      groups TEXT[],
      wins INT,
      games_played INT
    );`
  )
  .then(loadUsers)
  .catch(console.error);
  // TODO Create new table where games are rows and p1, p2 and date are fields
}

loadDB();
