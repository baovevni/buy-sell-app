const express = require("express");
const database = require("../db/database");

const router = express.Router();

router.get("/items", (req, res) => {
  database
    .getAllItems(req.query, 20)
    .then((items) => res.send({ items }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

router.get("/favourites", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  database
    .getAllFavourites(userId)
    .then((favourites) => res.send({ favourites }))
    .catch((e) => {
      console.error(e);
      res.send(e);
    });
});

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

module.exports = router;
