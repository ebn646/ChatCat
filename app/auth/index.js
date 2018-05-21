'use strict';
const passport = require('passport');
const config = require('../config');
const FacebookStrategy = require('passport-facebook').Strategy;
const db = require('../db');

module.exports = () => {
    passport.serializeUser((user, done) => {
         //stores a unique user _id in a session
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        //fetch user data from our mongodb collection
        findById(id)
            .then(user => done(null, user))
            .catch(error => console.log('Error when deserializing the user'))
    });

    let findById = id => {
        return new Promise((resolve, reject) => {
            db.userModel.findById(id, (error, user) => {
                if(error){
                    reject(error);
                } else{
                    resolve(user);
                }
            })
        })
    }

    //Find a single user based on a key
    let findOne = profileID =>{
        return db.userModel.findOne({
            'profileId': profileID   
       })
   }

    //create a new user and returns that instance from users facebook profile
    let createNewUser = (profile) =>{
        return new Promise((resolve,reject) => {
            let newChatUser = new db.userModel({
                profileId: profile.id,
                fullName: profile.displayName,
                profilePic: profile.photos[0].value || ''
            });
            //save the user instance in our database and return is back in the resolve
            newChatUser.save(error => {
                if(error){
                    console.log(error);
                    reject(error)
                } else{
                    resolve(newChatUser);
                }
            })
        })
    }

    // handles the data that is returned from fb
    let authProcessor = (accessToken, refreshToken, profile, done)=>{
        //Find a user in the local db using profile.id from fb
        //findone returns a promise
        findOne(profile.id)
            //if there is a result then 
            .then(result => {
                if(result){
                    //if you have a result invoke the done method
                    //first param is for error checking and can be set to null
                    done(null, result)
                }else{
                    //Create a new user and return to done function if user is not found
                    createNewUser(profile)
                        .then(newChatUser => done(null,newChatUser))
                        .catch(error => console.log('Error when creating new user'))
                }
            })
        //If user is found, eretur the user date using the done()
        //If user in not found, create one in the db
    }
    //Pass in fb credentials and callba
    passport.use(new FacebookStrategy(config.fb, authProcessor));
}