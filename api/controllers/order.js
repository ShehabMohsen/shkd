const express = require("express");
const router = express.Router();
const db = require("../models");
const ListingData = require("../data/ListingData");
const passport = require("../middlewares/authentication")
const { Listing } = db;

// The purpose of this router is to store order transactions

router.get("/", (req, res) => {
    Listing.findAll({}).then((allListing) => res.json(allListing));
});


module.exports = router
