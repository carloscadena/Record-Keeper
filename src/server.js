'use strict';
import path from 'path';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Route, StaticRouter as Router } from 'react-router-dom';
import { App } from './components/App';
import { Login } from './components/Login';



const pg = require('pg');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5400;
const app = express();
const conString = 'postgres://william:test@localhost:5432/kilovolt';
// const conString = 'postgres://localhost:5432';
const client = new pg.Client(conString);

client.connect();
client.on('error', function(error) {
  console.error(error);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(Express.static(path.join(__dirname, 'build')));
app.use(cors());

app.get('/', (req, res) => {
  let markup = '';
  let status = 200;
  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <div>
          <Route exact path="/" component={Login}/>
          <Route path="/user" component={App}/>
        </div>
      </Router>
    );
  }
  return res.status(status).render('index', { markup });
});


app.get('/groups/:id', (request, response) => {
  client.query(`SELECT DISTINCT group_name FROM groups;`)
  .then(result => response.send(result.rows))
  .catch(console.error);
});

app.get('/players/:group/:currentUser', (request, response) => {
  client.query(`SELECT user_name, id FROM users WHERE id IN (SELECT user_id FROM groups WHERE group_name = '${request.params.group}') AND id <> ${request.params.currentUser} `)
  .then(result => {
    let players = [];
    function asyncDataBaseCall(ele, callback){
      client.query(`SELECT id, user_name, (SELECT count(id) AS wins FROM GAMES WHERE loser_id=${request.params.currentUser} and winner_id=${ele.id}), (SELECT count(id) AS losses FROM GAMES WHERE loser_id=${ele.id} and winner_id=${request.params.currentUser}) FROM users WHERE id=${ele.id};`)
      .then(result => {
        players.push(result.rows[0]);
        console.log(result.rows)
        callback();
      });
    }
    let queries = result.rows.map( ele => {
      return new Promise( resolve => {
        asyncDataBaseCall(ele, resolve)
      });
    });
    Promise.all(queries).then(() => {
      response.send(players);
    });
  })
  .catch(console.error);
});
// app.post('/')
console.log("The current working directory is " + process.cwd());
console.log("Server located in " + __dirname);
app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}!`));

// --------------------------------------------------//
// ------- SEED database while in development ------ //
// --------------------------------------------------//
function loadUsers() {
  fs.readFile('./src/data/users.json', (err, fd) => {
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
  fs.readFile('./src/data/games.json', (err, fd) => {
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
  fs.readFile('./src/data/groups.json', (err, fd) => {
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
