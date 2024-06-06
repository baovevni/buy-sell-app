const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/messages');

// Retrieve messages from database
router.get('/', (req, res) => {
  userQueries.getMessages(req.session.userId)
    .then( messages => {
      res.render('messages', { user: req.session.userId, messages: messages} );
    });
});

// Post a new message
router.post('/', (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    res.redirect("/users/login");
    return res.send({ error: "user is not logged in" });
  }
  const text = req.body.text;
  const item_id = req.body.item_id;
  const owner_id = req.body.owner_id;
  userQueries.addMessage(text, item_id, owner_id)
    .then(() => {
      res.redirect(`/items/${item_id}`);
    });
});

// Delete message
router.post('/delete', (req, res) => {
  const owner_id = req.body.user_id;
  const message_id = req.body.message_id;
  userQueries.deleteMessage(owner_id, message_id)
    .then(() => {
      res.redirect("/messages");
    });
});

module.exports = router;
