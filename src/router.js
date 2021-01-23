const express = require('express');
const controllers = require('./controllers');
const Router = express.Router();

Router.get('/about', controllers.about)
            .get('/room', controllers.room)
            .get('/room/:id', controllers.room);

module.exports = Router;