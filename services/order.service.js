const { models } = require('../libs/sequelize');

class OrderService {

  constructor() { }

  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async addItems(data) {
    const newItems = await models.OrderProduct.bulkCreate(data);
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
      }
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
