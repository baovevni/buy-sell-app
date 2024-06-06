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

router.get('/register', (req, res) => {
  res.render('register', { user: req.session.userId });
});
// router.post('/register', (req, res) => {
//   res.render('register', { user: req.session.userId });
// });

// CREATE
router.post("/", (req, res) => {
  const user = req.body;
  userQueries
    .addUser(user)
    .then((user) => {
      if (!user) {
        return res.send({ error: "error" });
      }

      req.session.userId = user.id;
      res.send("🤗");
    })
    .catch((err) => res.send(err));
});

// Return information about the current user (based on cookie value)
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




router.post("/login", (req, res) => {
  const { email, password } = req.body;
  userQueries.getUserByEmail(email).then((user) => {
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

// Log a user out
router.post("/logout", (req, res) => {
  req.session.userId = null;
  res.redirect("/users/login");
});

// READ
router.get('/', (req, res) => {
  userQueries
    .getUsers()
    .then(users => {
      res.json({ users });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;

