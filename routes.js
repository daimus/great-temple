const express = require('express');
const router = express.Router();

/**
 * Define app logic controller
 */

const templeController = require('./Controllers/TempleController');
const authController = require('./Controllers/AuthController');

let routes = (app) => {
    // Authentication route
    router.get('/login', authController.login);
    router.post('/login', authController.doLogin);
    router.get('/register', authController.register);
    router.post('/register', authController.doRegister);
    router.get('/logout', authController.logout);
    // Temple route
    router.get('/', templeController.index);
    router.get('/temple', templeController.index);
    router.get('/temple/create', templeController.new);
    router.post('/temple', templeController.create);
    router.get('/temple/:templeId', templeController.show);
    router.get('/temple/:templeId/edit', templeController.edit);
    router.patch('/temple/:templeId', templeController.update);
    router.delete('/temple/:templeId', templeController.delete);

    app.use(router);
};

module.exports = routes;
