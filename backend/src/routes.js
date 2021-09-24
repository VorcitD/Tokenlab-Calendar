const express = require('express');
const routes = express.Router();
const  authMiddleware = require('./middlewares/auth')

const UsersController = require('./controllers/UsersController');
const SessionController = require('./controllers/SessionController');
const EventsController = require('./controllers/EventsController');

routes.post('/users',UsersController.create);
routes.get('/users',UsersController.index);
routes.post('/sessions',SessionController.create);

routes.use(authMiddleware);
routes.post('/events',EventsController.create);
routes.get('/events',EventsController.index);
routes.delete('/events/:id',EventsController.delete);
routes.put('/events/:id',EventsController.update);


module.exports = routes;