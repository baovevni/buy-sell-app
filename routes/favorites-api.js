/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const lodash = require('lodash');
const userQueries = require('../db/queries/favorite_items');

// Retrieve favorite Items for signed in user
router.get('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    console.error(err);
    return res.send(error);
  }
  userQueries
    .getFavoriteItems(userId)
    .then((favorites) => {
      const unique = lodash.uniqBy(favorites, 'item_id');
      res.render('favourites', { user: req.session.userId, items: unique });
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});


// Add an item into favorites for signed in user
router.post("/:id", (req, res) => {
  const userId = req.session.userId;
  const itemId = req.params.id;
  if (!userId) {
    res.redirect("/users/login");
    return res.send({ error: "user is not logged in" });
  }
  userQueries
    .addFavoriteItem(userId, itemId)
    .then((favourites) =>
      res.redirect('/items/' + itemId))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

// Remove an item from favorites for signed in user
router.post("/:id/delete", (req, res) => {
  const userId = req.session.userId;
  const itemId = req.params.id;
  if (!userId) {
    return res.send({ error: "error" });
  }

  userQueries
    .removeFavoriteItem(itemId)
    .then((favourites) => res.redirect('/favorites'))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;

