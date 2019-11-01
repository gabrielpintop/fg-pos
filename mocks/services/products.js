const productsData = require('../data/products.json');

class ProductsServiceMock {
    async getProducts() {
        return Promise.resolve(productsData);
    }

    async createProduct() {
        return Promise.resolve(productsData[0]);
    }

    async getAvailableProducts() {
        return Promise.resolve(productsData[0]);
    }
}

module.exports = ProductsServiceMock;