const MongoLib = require('../lib/mongo');

class ProductsService {

    constructor() {
        this.collection = 'products';
        this.mongoDB = new MongoLib();
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

    async createProduct(product) {
        const createProductId = await this.mongoDB.update(this.collection, product);
        return createProductId;
    }

    // async decreaseProductsUnits(products) {
    //     const bulkUpdateOperations = []
    //     products.map(product => {
    //         bulkUpdateOperations.push()
    //     });
    // }

    async deleteProduct(productId) {
        const deletedProductId = await this.mongoDB.delete(
            this.collection,
            productId
        );
        return deletedProductId;
    }

    async getProduct(productId) {
        const product = await this.mongoDB.get(this.collection, productId);
        return product || {};
    }

    async getProducts(email) {
        const products = await this.mongoDB.getAll(this.collection, {
            "productOwner": email
        });
        return products || [];
    }

    async updateProduct(product, productId) {
        const updatedProductId = await this.mongoDB.update(
            this.collection,
            product,
            productId
        );
        return updatedProductId;
    }
}

module.exports = ProductsService;