const MongoLib = require('../lib/mongo');
class InventoryService {
  constructor() {
    this.collection = 'products';
    this.mongoDB = new MongoLib();
  }
  async getProducts() {
    const products = await this.mongoDB.getAll(this.collection, {});
    return products || [];
  }

  async getProduct(productId) {
    const product = await this.mongoDB.get(this.collection, productId);
    return product || {};
  }

  async createProduct(product) {
    const createProductId = await this.mongoDB.update(this.collection, product);
    return createProductId;
  }

  async updateProduct(product, productId) {
    const updatedProductId = await this.mongoDB.update(
      this.collection,
      product,
      productId
    );
    return updatedProductId;
  }

  async deletedProduct(productId) {
    const deletedProductId = await this.mongoDB.delete(
      this.collection,
      productId
    );
    return deletedProductId;
  }
}

module.exports = InventoryService;
