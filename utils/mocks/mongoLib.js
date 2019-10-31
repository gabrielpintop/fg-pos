const sinon = require('sinon');

const {
    filteredProductsMock,
    productsMock
} = require('./products');

const getAllStub = sinon.stub();
getAllStub.withArgs('products').resolves(productsMock);

const nameQuery = {
    name: "Burrito"
};
getAllStub.withArgs('products', nameQuery).resolves(filteredProductsMock('Burrito'));

const createStub = sinon.stub().resolves(productsMock[0].id);

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
    createStub,
    getAllStub
}