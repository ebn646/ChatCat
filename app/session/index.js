'use strict';
const session = require('express-session');
//concet mongo to our session
const MongoStore = require('connect-mongo')(session);
const config = require('../config');
const db = require('../db');

if(process.env.NODE_ENV === 'production'){
    //init with production settings
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: db.Mongoose.connection
        })
    });
}else{
    //init with dev settings
    module.exports = session({
        secret: config.sessionSecret,
        resave: false,
        saveUninitialized: true
    })

}