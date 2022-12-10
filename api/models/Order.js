"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    // define Order. Order represents the listings the user purchased
    class Order extends Model{}
    
    Order.init({
        listings: {
            type: DataTypes.ARRAY(DataTypes.JSONB),
            allowNull: false,
        },
        tax: {
            type: DataTypes.FLOAT,
        },
        shipping: {
            type: DataTypes.FLOAT,
        },
        totalPrice:{
            type: DataTypes.FLOAT,
        },       

    },{
        sequelize,
        modelName: 'Order'
    })

    Order.associate = (models) => {
        // association with other models
        Order.belongsTo(models.User)
    } 
    //Order.sync({force: true})
    return Order
}

