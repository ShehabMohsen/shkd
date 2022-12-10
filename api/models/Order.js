"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    // define Order. Order represents the listings the user purchased
    class Order extends Model{}
    
    Order.init({

    }),{
        sequelize,
        modelName: 'Order'
    }


    Order.associate = (models) => {
        // association with other models
        Order.belongsTo(models.User)
    } 

    return Order
}

