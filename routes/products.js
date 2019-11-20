const express = require('express');
const ProductsService = require('../services/products');
const {
  handleGetRequest
} = require('../utils/handleSuccessfulRequest');

function productsApi(app) {
  const router = express.Router();
  const productsService = new ProductsService();
  app.use('/api/products', router);

  router.get('/', async function (req, res, next) {
    const email = "rodriguez02fer09@gmail.com";
    const products = await productsService.getProducts(email);
    try {
      res.status(200).json({
        data: products,
        message: 'Products listed'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/available', async function (req, res, next) {
    try {
      const products = await productsService.getAvailableProducts();
      handleGetRequest(res, products, 'Productos disponibles', 'os');
    } catch (error) {
      next(error);
    }
  });

  router.get('/:productId', async function (req, res, next) {
    const productId = req.params.productId;
    try {
      const products = await productsService.getProduct(productId);

      res.status(200).json({
        data: products,
        message: 'Product re'
      });
    } catch (error) {
      next(error);
    }
  });

  router.post('/', async function (req, res, next) {
    const product = req.body;
    try {
      const productsId = await productsService.createProduct(product);
      res.status(201).json({
        data: productsId,
        message: 'products created'
      });
    } catch (error) {
      next(error);
    }
  });

  router.put('/:productId', async function (req, res, next) {
    const productId = req.params.productId;
    const product = req.body;
    try {
      const updateProductsId = await productsService.updateProduct(
        product,
        productId
      );
      res.status(200).json({
        data: updateProductsId,
        message: 'products update'
      });
    } catch (error) {
      next(error);
    }
  });

  router.delete('/:productId', async function (req, res, next) {
    const productId = req.params.productId;
    try {
      const deleteProductsId = await productsService.deletedProduct(productId);
      console.log(productsMock);
      res.status(200).json({
        data: deleteProductsId,
        message: 'product remove'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = productsApi;