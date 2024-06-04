const db = require('../connection');

// READ
const addMessage = function(text, item_id, user_id) { // we have to make sure that user_id here is the user that is item owner
  return db.query(
    `INSERT
    INTO messages
    (text, item_id, user_id)
    values
    ($1, $2, $3)
    RETURNING *;
    `, [text, item_id, user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// READ
const getMessages = function(user_id) {
  return db.query(
    `SELECT *
    FROM messages
    WHERE user_id = $1;`, [user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// UPDATE
// DELETE
const deleteMessages = function(user_id) {
  return db.query(
    `DELETE
    FROM messages
    WHERE user_id = $1;`, [user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getMessages, addMessage, deleteMessages };
