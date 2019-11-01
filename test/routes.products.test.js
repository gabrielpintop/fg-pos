const assert = require('assert');
const proxyquire = require('proxyquire');
const ProductsServiceMock = require('../mocks/services/products');
const productsData = require('../mocks/data/products.json');
const testServer = require('../utils/testServer');

describe('routes - products', function () {
    const route = proxyquire('../routes/products', {
        '../services/products': ProductsServiceMock
    });

    const request = testServer(route);

    describe('GET /products/available', function () {
        it('should respond with status 200', function (done) {
            request.get('/api/products/available').expect(200, done);
        });

        it('should respond with the list of products available to sell', function (done) {
            request.get('/api/products/available').end((err, res) => {
                assert.deepEqual(res.body, {
                    data: productsData[0],
                    message: 'Productos disponibles listados'
                })
            });

            done();
        });

    });

});