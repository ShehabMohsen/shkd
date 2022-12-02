"use strict"

const {Model} = require("sequelize")
const bcrypt = require("bcryptjs");

// const sequelize = new Sequelize('sqlite::memory')

module.exports = (sequelize, DataTypes) => {
    
    // define Model. Model represents our means of interaction with DB table
    class User extends Model {}

    // Object of objects. each nested object (e.g. usernmame & email) is a column on the DB table
    User.init({    
        username: {
            type: DataTypes.STRING,
            allowNull:false, // does not allow an empty entry for a column on the table
            unique: true     // does not allow for duplicate entries on the column 
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull:false,
            validate: {
                isEmail: true, //makes sure the email provided follows email@example.com format
            }
        },
        passwordHash: {type: DataTypes.STRING},
        password: {
            type: DataTypes.VIRTUAL,
            validate:{
                isLongEnough: (val) => {
                    if (val.length < 8){
                        throw new Error("Please choose a larger password")
                    }
                },
            },
        },
    }, {
       sequelize,
       //modelName is used to make queries to DB in auth.js controller
       modelName: 'user'  // sequelize takes modelName and pluralizes it when creating the table for the model (user -> users)
    })

    // await User.sync({ force: true })


    User.associate = (models) => {
        // associations with other models
    }

    // beforeSave is provided by sequelize, it's a hook that runs before a model gets saved 
    User.beforeSave((user, options) => {
        // this will hash the password before storing it to the database
        if (user.password) {
            user.passwordHash = bcrypt.hashSync(user.password, 10);
        }
    });

    return User
}
