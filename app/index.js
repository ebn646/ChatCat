'use strict';

// social authentication logic where we invoke the authorization function(it exports as a function)
require('./auth')();

module.exports={
    router: require('./routes')(),
    session: require('./session')
}

