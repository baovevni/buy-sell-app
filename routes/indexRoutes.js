/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();


router.get('/', (req, res) => {
  res.render('index');
});

// Log a user in
router.get("/login", (req, res) => {
  res.render('login');
});
router.post("/login", (req, res) => {
  // req.session.user_id = newUser.id;
  res.redirect("/main");
})

router.get('/register', (req, res) => {
  res.render('register');
});

// Log a user out
router.post("/logout", (req, res) => {
  console.log("logout");
  req.session.user_id = null;
  res.redirect("/main");
});

router.get('/main', (req, res) => {
  res.render('main');
});
router.get('/messages', (req, res) => {
  res.render('messages');
});
router.get('/add_items', (req, res) => {
  res.render('add_items');
});
router.get('/my_items', (req, res) => {
  res.render('my_items');
});
router.get('/favourites', (req, res) => {
  res.render('favourites');
});
router.get('/item', (req, res) => {
  res.render('item');
});
router.get('/new_item', (req, res) => {
  res.render('new_item');
});

module.exports = router;

