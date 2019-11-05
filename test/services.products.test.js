const assert = require('assert');
const proxyquire = require('proxyquire');
const {
    getAllStub,
    MongoLibMock
} = require('../mocks/lib/mongoLib');
const productsData = require('../mocks/data/products.json');

describe('services - products', function () {

    const ProductsService = proxyquire('../services/products', {
        '../lib/mongo': MongoLibMock
    });

    const productsService = new ProductsService();

    describe('when getAvailableProducts method is called', async function () {
        it('should call the getAll MongoLib method', async function () {
            await productsService.getAvailableProducts();
            assert.strictEqual(getAllStub.called, true);
        });

        it('should return one product', async function () {
            const result = await productsService.getAvailableProducts();
            const expected = productsData[0];
            assert.deepEqual(result, expected);
        });
    });
});