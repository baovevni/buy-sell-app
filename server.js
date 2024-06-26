// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');
const itemHelpers = require('./db/queries/items');
const path = require('path');

const PORT = process.env.PORT || 8080;
const app = express();


app.set('view engine', 'ejs');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['qWeRtY!@#456'],
}));
app.use('/docs', express.static(path.join(__dirname, 'docs')));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require('./routes/users-api');
const itemsRoutes = require('./routes/items-api');
const favoritesRoutes = require('./routes/favorites-api');
const messagesRoutes = require('./routes/messages-api');


// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/users', usersRoutes);
app.use('/items', itemsRoutes);
app.use('/favorites', favoritesRoutes);
app.use('/messages', messagesRoutes);
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.redirect('/main');
});

app.get('/main', (req, res) => {
  itemHelpers.getItems()
    .then((items) => {
      console.log(items);
      res.render('main', { user: req.session.userId, items: items });
    })
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

