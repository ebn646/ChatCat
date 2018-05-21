'use strict';
//declare all our routes as an object

const h = require('../helpers');
const passport = require('passport');

module.exports = ()=>{
    let routes = {
        'get':{
            '/':(req,res,next)=>{
                res.render('login')
            },
            '/rooms':(req,res,next)=>{
                res.render('rooms',{
                    user: req.user
                });
            },
            '/chat':(req,res,next)=>{
                res.render('chatroom')
            },
            //kickstarts the facebook auth workflow
            "/auth/facebook": passport.authenticate('facebook'),
            //callbsck route where facebook sends back the access token
            "/auth/facebook/callback": passport.authenticate('facebook',{
                successRedirect: '/rooms',
                failureRedirect: '/' 
            })
        },
        'post':{

        },
        'NA':(req,res,next)=>{
            // custom error page
            res.status(404).sendFile(process.cwd() + '/views/404.html');
        }
    }

    return h.route(routes);

}