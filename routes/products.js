const fs = require('fs');
const express = require('express');
const ProductsService = require('../services/products');
const cacheReponse = require('../utils/cacheResponse');
const {
    FIVE_MINUTES_IN_SECONDS
} = require('../utils/time');

function productsApi(app) {
    const router = express.Router();
    app.use('/api/products', router);

    const productsService = new ProductsService();

    router.get('/forSell', async (req, res, next) => {
        try {
            const products = await productsService.getProducts({
                active: true,
                units: {
                    $gt: 0
                }
            });

            res.status(200).json({
                data: products,
                message: 'Products listed'
            })
        } catch (error) {
            next(error);
        }
    });
};

module.exports = productsApi;