const express = require("express");
const router = express.Router();
const db = require("../models");
const { user } = db;

// simple test to make sure route works
router.get("/", async (req, res) => {
  res.json({ ping: "pong" });
});



// sign up route
router.post("/signup", async (req, res) => {
  // signup content received from frontEnd. will be in the form of JSON Object
  let content = req.body;

  // breaking down the 'content' object and passing column entries on to the users table
  user.create({
    username: content.username,
    email: content.email,
    password: content.password,
  })
    .then((newUser) => {
      // response data frontend gets if the request is successful 
      res.status(201).json(newUser);
    })
    .catch((err) => {
      // error status and error details if request failed
      res.status(400).json(err);
    });
});


// export route instance so that ./controllers/index can import it to use with our API
module.exports = router