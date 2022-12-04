const express = require("express");
const router = express.Router();
/* const db = require("../models");
const passport = require("../middlewares/authentication") */
const listingData = require("../data/ListingData")

router.get("/", (req, res) => {
    res.status(200).json({ListingData});
});

// listing route

// export route instance so that ./controllers/index can import it to use with our API
module.exports = router;