const MongoLib = require('../lib/mongo');

class ProductsService {

    constructor() {
        this.collection = 'products';
        this.mongoDB = new MongoLib();
    }

    async getProducts(query, projection) {
        const products = await this.mongoDB.getAll(this.collection, query, projection);
        return products || [];
    }

    async getAvailableProducts() {
        const products = await this.mongoDB.getAll(this.collection, {
            active: true,
            units: {
                $gt: 0
            }
        });
        return products || [];
    }

    async decreaseProductsUnits(products) {
        const bulkUpdateOperations = []
        products.map(product => {
            bulkUpdateOperations.push()
        });
    }
}

module.exports = ProductsService;