/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/items');

router.get('/add_item', (req, res) => {
  res.render('add_item', { user: req.session.userId });
});

router.get('/item', (req, res) => {
  res.render('item', { user: req.session.userId });
});
router.get('/new_item', (req, res) => {
  res.render('new_item', { user: req.session.userId });
});

// CREATE
router.post("/", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  const newItem = req.body;
  newItem.user_id = userId;
  console.log(newItem);
  userQueries
    .addItem(newItem)
    .then((item) => {
      res.redirect("/items");
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// READ
router.get("/", (req, res) => {
  userQueries
    .getUsersItems(req.session.userId)
    .then((items) => res.render('my_items', { user:req.session.userId, items }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;
