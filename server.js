const debug = require('debug')('bles-chat:server');
const http = require('http');
const port = process.env.PORT || '7777';
const env = require('./config/env')[process.env.NODE_ENV || 'development'];
const express = require('./config/express');

function createServer(port) {
    return new Promise((resolve, reject) => {
        require('./api')(env)
        .then(api => {
            let app = express.init(api, port);
            let server = http.createServer(app);
            let io = require('socket.io')(server);

            let chat = io.of('/chat');

            chat.on('connection', socket => {
                debug(`${socket.id} connected`);

                socket.on('send message', body => {
                    socket.broadcast.emit('receiver message', body);
                });

                socket.on('disconnect', () => {
                    debug(`${socket.id} disconnected`);
                });
            });

            server.listen(app.get('port'), '0.0.0.0', () => {
                debug('Listenning: http://chat.bles:' + app.get('port'));
            });

            resolve(api);
        })
        .catch(error => {
            debug('Error: ' + error);
            reject(error);
        });
    });
}

function normalizePort(value) {
    let port = Number.parseInt(value, 10);
    
    if (Number.isNaN(port)) {
        return value;
    }

    if (port >= 0) {
        return port;
    }

    return false;
}

createServer(normalizePort(port));

module.exports.createServer = createServer;
module.exports.normalizePort = normalizePort;
