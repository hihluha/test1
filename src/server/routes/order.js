const express = require('express');

const router = express.Router();
const isAuth = require("../auth/isAuthenticated");
const ordersController = require('../controllers/ordersControllers');


router.post('/saveorder', isAuth.isAuthenticated, ordersController.saveOrder);

router.patch('/editorder', isAuth.isAuthenticated, ordersController.editOrder);

router.delete('/deleteorder', isAuth.isAuthenticated, ordersController.deleteOrder);

router.get('/getorders', isAuth.isAuthenticated, ordersController.orders);

router.get('/getcars', isAuth.isAuthenticated, ordersController.cars);

module.exports = router;