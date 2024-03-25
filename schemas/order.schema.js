const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().min(1).precision(2);
const amount = Joi.number().integer().min(1);

const getOrderSchema = Joi.object({
    id: id.required(),
});

const createOrderSchema = Joi.object({
    customerId: customerId.required(),
});

const addItemSchema = Joi.object({
    orderId: orderId.required(),
    productId: productId.required(),
    name: name.required(),
    price: price.required(),
    amount: amount.required(),
});

const addItemsSchema = Joi.array().items(addItemSchema).single();

module.exports = { getOrderSchema, createOrderSchema, addItemSchema, addItemsSchema };