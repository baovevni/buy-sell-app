const db = require('../connection');

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

// don't forget to fix addMessage!!!!
const addMessage = function(user_id) {
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
