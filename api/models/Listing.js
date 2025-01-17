
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
                isAlpha: true,
                //Checks if Gender matches. (Will need to create a array containing Gender?)
                isIn: [['Male','Female','Unisex']]
            }
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isAlpha: true,
                //Checks if letters, will need to create a array of categories)
                //isIn: [['Shirt','Pants']]
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
                //Checks if size validate (Will need to create a array containing sizes?)
                //Will need to consider numbers for shoe size
                // isIn: [['XL','L','M','S','XS']]      
            }
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,

        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                isUrl: true //Checks for valid URL.
            }
        },
    },{
        sequelize,
        //modelName is used to make queries to DB in listing.js controller
        modelName: 'Listing'  // sequelize takes modelName and pluralizes it when creating the table for the model 
         
    })

    //Tying User to Listing
     Listing.associate = (models) => {
        // association with other models
        Listing.belongsTo(models.User)
    } 

    // Listing.sync({force:true})

    return Listing
}

