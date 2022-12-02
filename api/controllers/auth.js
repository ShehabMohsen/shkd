const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("../middlewares/authentication")

const { User } = db;

// simple test to make sure route works
router.get("/", async (req, res) => {
  res.json({ ping: "pong" });
});

// sign up route
router.post("/signup", async (req, res) => {
  // signup content received from frontEnd. will be in the form of JSON Object
  let content = req.body;

  // breaking down the 'content' object and passing column entries on to the users table
  User.create({
    username: content.username,
    email: content.email,
    password: content.password,
  })
    .then((newUser) => {
      // response data frontend gets if the request is successful 
      req.login(newUser, () => res.status(201).json(newUser));
    })
    .catch((err) => {
      // error status and error details if request failed
      res.status(400).json({msg:"Failed Signup", err});
    });
});

router.post("/login", passport.authenticate("local"), (req, res) => {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.json(req.user);
});

router.get("/login", (req, res) => {
  if (req.user) {
    res.json(req.user);
  } else {
    res.sendStatus(401);
  }
});

router.post("/logout", (req, res, next) => {
  // Logout is now async and has to finish before we can return a response
  //  passport version >= 0.6.0
  //  https://medium.com/passportjs/fixing-session-fixation-b2b68619c51d
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logout successful" });
  });
});

// export route instance so that ./controllers/index can import it to use with our API
module.exports = router