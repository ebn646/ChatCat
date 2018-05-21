'use strict';

//bring in express router
//const router = require('express').Router();
const router = require('express').Router();
const db = require('../db');

    // Iterate through the routes and mount the routes
    let _registerRoutes = (routes,method)=>{
        for(let key in routes){
            if(typeof routes[key] === 'object' && routes[key] !== null && !(routes[key] instanceof Array)){
                //1. iterate through our routes object and get the 'get' or 'post' objects then recursively call this function
                _registerRoutes(routes[key], key);
            }else{
                // Register each 'get' and 'post' route
                //2. when you call the function again with the 'get' or 'post' items, each route is a functions not an object and the else is called.
                if(method === 'get'){
                    router.get(key, routes[key])
                }else if(method === 'post'){
                    router.get(key, routes[key])
                }else{
                    router.use(routes[key]);
                }
            }
        }
    }

    let route = routes => {
        _registerRoutes(routes);
        return router;
    }



    module.exports = {
        route: route
    }

