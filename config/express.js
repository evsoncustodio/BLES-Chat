const express = require('express');

const serveFavicon = require('serve-favicon');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cors = require('cors');
const handlerError = require('errorhandler');

module.exports.init = (api, port) => {
    const Generic = api.utils.generic;

    const app = express();

    app.set('port', port);

    app.use(serveFavicon('public/favicon.png'));
    app.use(logger('dev'));
    app.use(methodOverride());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(serveStatic('public'));

    app.use(cors());

    Generic.rest(app, api);

    if (app.get('env') == 'development') {
        app.use(handlerError());
    }

    return app;
}