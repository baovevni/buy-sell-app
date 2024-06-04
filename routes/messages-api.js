const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/items');

router.get('/', (req, res) => {
  userQueries.getItems()
    .then(items => {
      res.json(items);
    });
});

router.post('/', (req, res) => {
  userQueries.addItem(req.body.item)
    .then(() => {
      res.json({ message: 'Item added' });
    });
});

router.post('/:id/delete', (req, res) => {
  userQueries.deleteItem(req.params.id)
    .then(() => {
      res.json({ message: 'Item deleted' });
    });
});



module.exports = router;
