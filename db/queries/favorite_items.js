const db = require('../connection');

// CREATE
const addFavoriteItem = function(user_id, item_id) {
  return db.query(
    `INSERT
    INTO favorite_items
    (user_id, item_id)
    values
    ($1, $2)
    RETURNING *;`, [user_id, item_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// READ
const getFavoriteItems = function(user_id) {
  return db.query(
    `SELECT *
    FROM favorite_items
    WHERE user_id = $1;`, [user_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
// UPDATE
// REMOVE
const removeFavoriteItem = function(item_id) {
  return db.query(
    `DELETE
    FROM
    favorite_items
    WHERE
    item_id = $1
    RETURNING *;`, [item_id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};
module.exports = { getFavoriteItems, addFavoriteItem, removeFavoriteItem };
