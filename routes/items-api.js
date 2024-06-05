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

router.post('/items', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ error: "error" });
  }

  const newItem = req.body;
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

router.post('/:id/delete', (req, res) => {
  const itemId = req.params.id;
  const userId = req.session.userId;

  userQueries.deleteItem(itemId)
    .then((item) => {
      res.redirect("/items");
    })
    .catch((err) => {
      console.error(`Error deleting item with ID ${itemId}:`, err);
      res.status(500).send({ error: "An error occurred while deleting the item" });
    });
});

router.get('/:id', (req, res) => {
  const itemId = req.params.id;
  const userId = req.session.userId;

  userQueries.getItem(itemId)
    .then((item) => {
      if (!item) {
        console.log(`Item with ID ${itemId} not found`);
        return res.status(404).send("Item not found");
      }

      console.log(`Item found: ${JSON.stringify(item)}`);
      res.render('item', { user: userId, item });
    })
    .catch((err) => {
      console.error(`Error retrieving item with ID ${itemId}:`, err);
      res.status(500).send({ error: "An error occurred while retrieving the item" });
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


router.post('/:id/sold', (req, res) => {
  const itemId = req.params.id;

  userQueries.markItemAsSold(itemId)
    .then((item) => {
      res.redirect("/items");
    })
    .catch((err) => {
      console.error(`Error marking item with ID ${itemId} as sold:`, err);
      res.status(500).send({ error: "An error occurred while marking the item as sold" });
    });
});


module.exports = router;
