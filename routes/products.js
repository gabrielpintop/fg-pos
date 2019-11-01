const express = require('express');
const ProductsService = require('../services/products');
const {
    handleGetRequest
} = require('../utils/handleSuccessfulRequest');

function productsApi(app) {
    const router = express.Router();
    app.use('/api/products', router);

    const productsService = new ProductsService();

    router.get('/available', async (req, res, next) => {
        try {
            const products = await productsService.getAvailableProducts();
            handleGetRequest(res, products, 'Productos disponibles', 'os');
        } catch (error) {
            next(error);
        }
    });
};

module.exports = productsApi;