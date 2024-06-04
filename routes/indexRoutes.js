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
  res.render('login', { user: req.user });
});

router.get('/register', (req, res) => {
  res.render('register', { user: req.user });
});

router.get('/main', (req, res) => {
  res.render('main',{ user: req.user });
});
router.get('/messages', (req, res) => {
  res.render('messages', { user: req.user });
});
router.get('/add_items', (req, res) => {
  res.render('add_items', { user: req.user });
});
router.get('/my_items', (req, res) => {
  res.render('my_items', { user: req.user });
});
router.get('/favourites', (req, res) => {
  res.render('favourites', { user: req.user });
});
router.get('/item', (req, res) => {
  res.render('item', { user: req.user });
});
router.get('/new_item', (req, res) => {
  res.render('new_item', { user: req.user });
});

module.exports = router;

