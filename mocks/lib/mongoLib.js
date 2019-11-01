const productsData = require('../data/products.json');
const sinon = require('sinon');
const getAllStub = sinon.stub();

// Products stub
getAllStub.withArgs('products', {
    active: true,
    units: {
        $gt: 0
    }
}).resolves(productsData[0]);

class MongoLibMock {
    getAll(collection, query) {
        return getAllStub(collection, query);
    }

    create(collection, data) {
        return createStub(collection, data);
    }
}

module.exports = {
    MongoLibMock,
    getAllStub
};