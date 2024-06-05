/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/favorite_items');


router.get('/', (req, res) => {
  const userId = req.session.userId;
  console.log(userId);
  if (!userId) {
    return res.send({ error: "error" });
  }

  userQueries
    .getFavoriteItems(userId)
    .then((favorites) => {
      console.log(favorites);
      res.render('favourites', { user: req.session.userId, items: favorites });
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

router.post("/item", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  userQueries
    .addFavoriteItem(userId)
    .then((favourites) => res.send({ favourites }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});


router.post("/:id", (req, res) => {
  const userId = req.session.userId;
  const itemId = req.params.id;
  if (!userId) {
    return res.send({ error: "error" });
  }

  userQueries
    .addFavoriteItem(userId, itemId)
    .then((favourites) => res.send({ favourites }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});


router.delete("/:id", (req, res) => {
  const userId = req.session.userId;
  const itemId = req.params.id;
  if (!userId) {
    return res.send({ error: "error" });
  }

  userQueries
    .removeFavoriteItem(userId, itemId)
    .then((favourites) => res.send({ favourites }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});
module.exports = router;
