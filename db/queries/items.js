const db = require('../connection');

// CREATE

const addItem = function(newItem) {
  return db.query(
    `INSERT
    INTO items
    (name, description, size, price, imageURL, user_id)
    VALUES ($1, $2, $3, $4 * 100, $5, $6)
    RETURNING *;
    `, [newItem.name, newItem.description, newItem.size, newItem.price, newItem.imageURL, newItem.user_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// READ
const getItem = function(id) {
  return db.query(
    `SELECT *
    FROM items
    WHERE id = $1;`, [id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getItems = function() {
  return db.query(
    `SELECT *
    FROM items
    ORDER BY id DESC
    LIMIT 8;`)
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const filterItems = function(minPrice, maxPrice) {
  return db.query(
    `SELECT *
    FROM items
    WHERE price >= $1
    AND
    price <= $2
    ORDER BY id DESC
    LIMIT 8;`, [minPrice, maxPrice])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getUsersItems = function(id) {
  return db.query(
    `SELECT *
    FROM items
    WHERE user_id = $1
    ORDER BY id DESC
    LIMIT 8;`, [id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// UPDATE
const markItemAsSold = function(id) {
  return db.query(
    `UPDATE items
    SET
    sold = TRUE
    WHERE id = $1
    RETURNING *;
    `, [id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const editItem = function(name, description, size, price, imageURL, item_id) {
  return db.query(
    `UPDATE
    items
    SET
    name = $1,
    description = $2,
    size = $3,
    price = $4 * 100,
    imageURL = $5
    WHERE id = $6
    RETURNING *;
    `, [name, description, size, price, imageURL, item_id])
    .then(data => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

// DELETE
const deleteItem = function(id) {
  return db.query(
    `DELETE
    FROM
    items
    WHERE id = $1;
    `, [id])
    .then(data => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { getItem, getItems, filterItems, getUsersItems, markItemAsSold, addItem, editItem, deleteItem };
