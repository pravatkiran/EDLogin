/**
 * Main application file
 */

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import http from 'http';

import expressConfig from './config/express';
import registerRoutes from './routes';
import seedDatabaseIfNeeded from './config/seed';
// const expressjwt = require('express-jwt');
// import expressJwt from 'express-jwt';


// Setup server
var app = express();
var server = http.createServer(app);


expressConfig(app);
registerRoutes(app);

// app.use(expressJwt({secret: 'supersecretkey'}).unless({path: ['/user/create', '/login']}));
// Start server
function startServer() {
    app.angularFullstack = server.listen(config.port, config.ip, function () {
        console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
    });

}


sqldb.sequelize.sync()
    .then(seedDatabaseIfNeeded)
    .then(startServer)
    .catch(err => {
        console.log('Server failed to start due to error: %s', err);
    });

// Expose app
exports = module.exports = app;
