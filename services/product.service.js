const boom = require('@hapi/boom');
const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');

class ProductsService {

  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);

    return newProduct;
  }

  async find(query) {
    const { limit, offset } = query;

    const options = {
      include: ['category'],
    }

    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    }

    const products = await models.Product.findAll(options);

    return products;
  }

  async findOne(id) {
    const product = await models.Category.findByPk(id, {
      include: ['category']
    });

    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);

    const response = await product.update(changes);

    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);

    await product.destroy();

    return { id };
  }

}

module.exports = ProductsService;
