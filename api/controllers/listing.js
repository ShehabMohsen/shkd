const express = require("express");
const router = express.Router();
const db = require("../models");
const ListingData = require("../data/ListingData");
const passport = require("../middlewares/authentication")

const { Listing } = db;

router.get("/", (req, res) => {
    //res.status(200).json({ping: "Listing pong"});

    //Outputs ../data/ListingData.js
    //GET localhost:8080/api/listing
    //RESULTS: https://prnt.sc/CvWneA54IOz7
    
    res.status(200).json(ListingData); 
});

// listing route
router.post("/createListing", passport.isAuthenticated() , (req, res) =>{
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
        image: content.image,
        user: user,
    })
        .then((newData) =>{
            // response data frontend gets if the request is successful 
            res.status(201).json({newData});
        })
        .catch((err) =>{
            // error status and error details if request failed
            res.status(400).json({msg: "Failed to Create Listing",err});
        });
    
    //Ties listing id to user.
    // https://sequelize.org/docs/v6/core-concepts/assocs/#philosophy
    //Listing.hasOne(user);
});


// ################# CODE BELOW HASN'T BEEN TESTED ###############

// editing a post
router.put("/:id", passport.isAuthenticated(), (req, res) =>{
    const { id } = req.params;
    Listing.findByPk(id).then((lpost) => {
        if (!lpost){
            return res.sendStatus(400);
        }

        lpost.content = req.body.content;
        lpost
            .save()
            .then((updatePost) => {
                res.json(updatePost);
            })
            .catch((err) => {
                res.status(400).json(err);
            })
    })
})

// deleting a post
router.delete("/:id", (req, res) =>{
    const { id } = req.params;
    Listing.findByPk(id).then((lpost) =>{
        if(!lpost){
            return res.sendStatus(400);
        }

        lpost.destroy();
        res.sendStatus(204); //No content JSON error message.
    })
})

//############################################################

// export route instance so that ./controllers/index can import it to use with our API
module.exports = router;