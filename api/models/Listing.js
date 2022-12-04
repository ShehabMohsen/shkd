"use strict"

const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    // define Listing. Listing represents the items users will be interacting with
    class Listing extends Model{}
    
    //Object of object (all the listings)
    Listing.init({
        listing_name: {
            type: DataTypes.STRING,
            allowNull: false, // does not allow an empty entry for a column on the table
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                //Checks if Gender matches.
            }

        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                //Checks if category matches with categories.
            }

        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,

        },
        size: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                //Checks if size validate
            }

        },
        listing_region: {
            type: DataTypes.STRING,

        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,

        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,

        },
    },{
        //############PORTION TAKEN FROM SHEHAB'S AUTH.JS. REVISIT JUST IN CASE
        sequelize,
        //modelName is used to make queries to DB in listing.js controller
        modelName: 'Listing'  // sequelize takes modelName and pluralizes it when creating the table for the model 
         
    })

    return Listing
}

