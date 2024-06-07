/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const userQueries = require('../db/queries/users');

// Log a user in
router.get("/login", (req, res) => {
  res.render('login', { user: req.session.userId });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  userQueries
  .getUserByEmail(email)
  .then((user) => {
    if (!user) {
      return res.send({ error: "no user with that email" });
    }
    console.log(user.password);
    if (password !== user.password) {
      return res.send({ error: "error" });
    }

    req.session.userId = user.id;
    res.redirect("/main");

  });
});

// Register a user
router.get('/register', (req, res) => {
  res.render('register', { user: req.session.userId });
});

router.post("/register", (req, res) => {
  const {name, email, password, phone} = req.body;
  userQueries
    .addUser(name, email, password, phone)
    .then((user) => {
      req.session.userId = user.id;
      res.redirect("/main");
    })
    .catch((err) => res.send(err));
});

// Get user by User ID
router.get("/", (req, res) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.send({ message: "not logged in" });
  }

  userQueries
    .getUserById(userId)
    .then((user) => {
      if (!user) {
        return res.send({ error: "no user with that id" });
      }

      res.send({
        user: {
          name: user.name,
          email: user.email,
          id: userId,
        },
      });
    })
    .catch((e) => res.send(e));
});



// Logout a user
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/users/login");
});

module.exports = router;
