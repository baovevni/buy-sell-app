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

//when item is clicked on, it will take you to the item page
router.get('/item/:id', (req, res) => {
  const itemId = req.params.id;
  userQueries
    .getItem(itemId)
    .then((item) => {
      res.render('item', { user: req.session.userId, item });
    })
    .catch((err) => {
      console.error(err);
      res.send({ error: "error" });
    });
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
    .then(() => {
      res.redirect("/items");
    })
    .catch((err) => {
      console.error(err);
      res.send({ error: "error" });
    });
});

// READ
router.get("/", (req, res) => {
  userQueries
    .getUsersItems(req.session.userId)
    .then((items) => res.render('my_items', { user:req.session.userId, items }))
    .catch((err) => {
      console.error(err);
      res.send({ error: "error" });
    });
});

module.exports = router;
