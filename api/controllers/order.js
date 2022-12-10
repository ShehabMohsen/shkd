const express = require("express");
const router = express.Router();
const db = require("../models");
const ListingData = require("../data/ListingData");
const passport = require("../middlewares/authentication")
const { Listing } = db;

// The purpose of this router is to store order transactions

//Getting all the order for a user
router.get("/", passport.isAuthenticated(), (req, res) => {
    Listing.findAll({}).then((allListing) => res.json(allListing));
});


//Adding a new order transaction
router.post("/createOrder", passport.isAuthenticated(), (req,res) =>{

});

module.exports = router
