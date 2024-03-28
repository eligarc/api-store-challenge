const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
class OrderService {

  constructor() { }

  async create(userId) {
    const customer = await models.Customer.findOne({
      include: ['user'],
      where: {
        '$user.id$': userId
      }
    });

    if (!customer) {
      throw boom.notFound('Customer not found');
    }

    const newOrder = await models.Order.create({ customerId: customer.dataValues.id });

    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async addItems(data) {
    const newItems = await models.OrderProduct.bulkCreate(data);

    newItems.forEach(async (item) => {
      await models.Product.updateStock(item.productId, item.amount);
    });
    return {
      message: `Items added: ${newItems.length}`
    };
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId // Consulta por las asociaciones que tiene una orden. Es decir, una orden tiene cliente asociado, un cliente tiene un usuario asociado.
      },
      include: [{
        association: 'customer',
        include: ['user'],
      },
        'items'
      ]
    });
    return orders;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [{
        association: 'customer',
        include: [{
          attributes: ['id', 'email', 'role'],
          association: 'user'
        }],
      },
        'items'
      ]
    });
    return order;
  }

}

module.exports = OrderService;
