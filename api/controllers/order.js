const express = require("express");
const router = express.Router();
const db = require("../models");
const ListingData = require("../data/ListingData");
const passport = require("../middlewares/authentication");
//const Order = require("../models/Order");
const { Listing } = db;
const { Order } = db;

// The purpose of this router is to store order transactions

//Getting all the order for a user
router.get("/myOrders", passport.isAuthenticated(), (req, res) => {
    Order.findAll({
        where: { UserId: req.user.dataValues.id },
        order:[
            ["updatedAt", "DESC"]
        ]
    }).then((allOrders) => res.json(allOrders));
});

//Adding a new order transaction
router.post("/createOrder", passport.isAuthenticated(), (req,res) =>{
    let content = req.body;
    let user = req.user;

    Order.create({
        UserId:user.dataValues.id,
        listings: content.listings,
/*         tax: content.tax, //Perhaps it being a equation, calculate towards content.tax
        shipping: content.shipping, //Same as above */
        totalPrice: content.totalPrice,
    })
        .then((newOrder)=>{
            res.status(201).json({newOrder});
            
        })
        .catch((err)=>{
            res.status(400).json({msg:"Failed to add order to table.",err})
        })
});

module.exports = router
