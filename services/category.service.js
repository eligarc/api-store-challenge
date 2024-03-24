const boom = require('@hapi/boom');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.Category.create(data);

    return newCategory;
  }

  async find() {
    const categories = await models.Category.findAll();

    return categories;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });

    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);

    const response = await category.update(changes);

    return response;
  }

  async delete(id) {
    const product = await this.findOne(id);

    await product.destroy();

    return { id };
  }

}

module.exports = CategoryService;
