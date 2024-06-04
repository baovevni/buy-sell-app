const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/messages');

router.get('/', (req, res) => {
  userQueries.getMessages(req.session.userId)
    .then( messages => {
      console.log(messages);
      res.render('messages', { user: req.session.userId, messages: messages} );
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
