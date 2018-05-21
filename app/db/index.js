'use strict';

const config = require('../config');
const Mongoose = require('mongoose');

Mongoose.connect(config.dbURI,function(err,db){
    if(err){
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    }else{
        console.log('Connected to Server successfully!');
    }
});

let Schema = Mongoose.Schema;

// create a scchema the defines the structure for storin user data

const chatUser = new Mongoose.Schema({
    profileId: String,
    fullName: String,
    profilePic: String
});

//Turn the schema into a model
//Mongo will automatically create a collection called chatUsers

let userModel = Mongoose.model('chatUser', chatUser);

module.exports ={
    Mongoose,
    userModel
}