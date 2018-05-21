'use strict';
const express= require('express');
const app = express();
const ChatCat = require('./app')
const passport = require('passport')
const https = require('https')
const fs = require('fs')
const path = require('path')

let helloMiddleware = (req,res,next)=>{
    req.hello = "Hello, it's me middleware!";
    //next is necessary to process the route handler stack when processing or preprocessing data
    next();
};

//plugin the middleware into the request and response streams before declaring the routers
app.use(helloMiddleware)

app.set('port',process.env.PORT || 3000);
//route static assets
app.use(express.static('public'))
//bring ejs into our app
app.set('view engine','ejs')

//connect to our session middleware
app.use(ChatCat.session);
//apply passport middleware to add req.user to the req stream
app.use(passport.initialize());
//apply middlelware to hooks up to write to and read from sessions variables in passport.serializeUser and passport.deserializeUser
app.use(passport.session());
//mount router middleware
app.use('/',ChatCat.router);

app.get('/dashboard', (req,res,next)=>{
    res.send('<h1>Hello From the dashboard page</h1>')
});

var certOptions = {
    key: fs.readFileSync(path.resolve('key.pem')),
    cert: fs.readFileSync(path.resolve('cert.pem'))
  }

var server = https.createServer(certOptions, app).listen(app.get('port'), ()=>{
    console.log('ChatCat Running on port ', 3000)
});