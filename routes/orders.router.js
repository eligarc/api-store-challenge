const express = require('express');
const password = require('passport');

const OrderService = require('../services/order.service');
const validatorHandler = require('../middlewares/validator.handler');

const {
  getOrderSchema,
  createOrderSchema,
  addItemSchema,
  addItemsSchema
} = require('../schemas/order.schema');
const { checkRoles } = require('./../middlewares/auth.handler');

const router = express.Router();
const service = new OrderService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  password.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
      const newOrder = await service.create(req.user.sub);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-item',
  password.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(addItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/add-items',
  password.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(addItemsSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newItems = await service.addItems(body);
      res.status(201).json(newItems);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
