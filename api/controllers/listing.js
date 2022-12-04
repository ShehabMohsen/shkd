const express = require("express");
const router = express.Router();
const db = require("../models");
const ListingData = require("../data/ListingData");
const passport = require("../middlewares/authentication")

//Check for returning JSON object
/* router.get("/", (req, res) => {
    res.status(200).json({ListingData});
});
 */
const { Listing } = db;

router.get("/", (req, res) => {
    res.status(200).json({ping: "Listing pong"});
});

// listing route
router.post("/createListing", passport.authenticate("local"), (req, res) =>{
    // listing content received from frontEnd, in a JSON Object form
    let content = req.body;
    let user = req.user;

    Listing.create({
        listing_name: content.listing_name,
        gender: content.gender,
        category: content.category,
        description: content.description,
        size: content.size,
        listing_region: content.listing_region,
        price: content.price,
        image: content.image
    })
        .then((newData) =>{
            // response data frontend gets if the request is successful 
            res.status(201).json({newData});
        })
        .catch((err) =>{
            // error status and error details if request failed
            res.status(400).json({msg: "Failed to Create Listing",err});
        });
    
    //Ties user to the listing
});


  
// export route instance so that ./controllers/index can import it to use with our API
module.exports = router;