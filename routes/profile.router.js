const express = require('express');
const password = require('passport');

const OrderService = require('../services/order.service');
const { checkRoles } = require('./../middlewares/auth.handler');


const router = express.Router();

const service = new OrderService();

router.get('/my-orders',
    password.authenticate('jwt', { session: false }),
    checkRoles('customer'),
    async (req, res, next) => {
        try {
            const orders = await service.findByUser(req.user.sub);
            res.json(orders);
        } catch (error) {
            next(error);
        }
    });


module.exports = router;