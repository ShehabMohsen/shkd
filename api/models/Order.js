"use strict"
const {Model} = require("sequelize")

module.exports = (sequelize, DataTypes) => {

    // define Order. Order represents the listings the user purchased
    class Order extends Model{}
    
    Order.init({
        listings: {
            // Currently figuring out how to pass JSON array.
            //https://dba.stackexchange.com/questions/54283/how-to-turn-json-array-into-postgres-array
            type: DataTypes.ARRAY(DataTypes.BIGINT),
            allowNull: false,
        },
        tax: {
            type: DataTypes.FLOAT,
        },
        shipping: {
            type: DataTypes.FLOAT,
        },
        total:{
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

    return Order
}

/* ################################################

JSON INPUT:
{
	"listings":"1,2,3,4",
	"tax": "30.00",
	"shipping": "20.00",
	"total": "80.00"
}

*/
