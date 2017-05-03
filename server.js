'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5400;
const app = express();
// const conString = 'postgres://william:test@localhost:5432/kilovolt';
const conString = 'postgres://localhost:5432';
const client = new pg.Client(conString);
const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const session = require('express-session');

client.connect();
client.on('error', function(error) {
  console.error(error);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'isTopSecret', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

passport.use(new GithubStrategy({
  clientID: 'ede580df72c31c310057',
  clientSecret: '1b5d3e6f859347cb62a4015f10890d2713739a5f',
  callbackURL: 'http://localhost:5400/auth/github/callback'
},
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

app.get('/', (request, response) => {
  if (request.isAuthenticated()) {
    response.redirect('/user')
  } else {
    response.sendFile('index.html', { root: path.join(__dirname, './public') })
  }
});

app.get('/user', (request, response) => {
  if (request.isAuthenticated()) {
    response.sendFile('index.html', { root: path.join(__dirname, './public') })
  } else {
    response.redirect('/')
  }
});

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
  function(request, response) {
    response.redirect('/user');
  }
);

app.get('/logout', function(request, response){
  console.log('logging out');
  request.logout();
  response.redirect('/');
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

// app.listen(PORT, () => console.log(`CORS-enabled server listening on port ${PORT}!`));
app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));


// --------------------------------------------------//
// ------- SEED database while in development ------ //
// --------------------------------------------------//
function loadUsers() {
  fs.readFile('./public/data/users.json', (err, fd) => {
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
  fs.readFile('./public/data/games.json', (err, fd) => {
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
  fs.readFile('./public/data/groups.json', (err, fd) => {
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
