/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/items');

// CREATE
router.post("/items", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  const newItem = req.body;
  newItem.user_id = userId;
  database
    .addItem(newItem)
    .then((item) => {
      res.send(item);
    })
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

// READ
router.get("/items", (req, res) => {
  userQueries
    .getItems(req.query)
    .then((items) => res.send({ items }))
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;
