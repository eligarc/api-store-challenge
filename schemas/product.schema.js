const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const description = Joi.string().min(10);
const price = Joi.number().min(10).precision(2);
const quantity = Joi.number().integer();
const available = Joi.boolean();
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const createProductSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  quantity: quantity.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
  quantity,
  available,
  image
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
