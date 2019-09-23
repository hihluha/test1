const express = require('express');

const router = express.Router();
const isAuth = require("../auth/isAuthenticated");
const customerController = require('../controllers/customersControllers');

router.get('/all', isAuth.isAuthenticated, customerController.all);

router.post('/search', isAuth.isAuthenticated, customerController.search);

router.post('/save', isAuth.isAuthenticated, customerController.save);

router.get('/newcustomer', isAuth.isAuthenticated, customerController.new);

router.get('/customer', isAuth.isAuthenticated, customerController.customer);

router.post('/savecar', isAuth.isAuthenticated, customerController.saveCar);

router.patch('/editcar', isAuth.isAuthenticated, customerController.editCar);

router.delete('/deletecar', isAuth.isAuthenticated, customerController.deleteCar);

module.exports = router;