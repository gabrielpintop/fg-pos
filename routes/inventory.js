const express = require('express');
const { productsMock } = require('../utils/mocks/products');
const InventoryService = require('../service/inventory');

function inventarioApi(app) {
  const router = express.Router();
  const inventoryService = new InventoryService();

  app.use('/api/products', router);

  router.get('/', async function(req, res, next) {
    const products = await inventoryService.getProducts();
    try {
      res.status(200).json({
        data: products,
        message: 'products list'
      });
    } catch {
      next(error);
    }
  });

  router.get('/:productId', async function(req, res, next) {
    const productId = req.params.productId;
    try {
      const products = await inventoryService.getProduct(productId);

      res.status(200).json({
        data: products,
        message: 'products get by id'
      });
    } catch {
      next(error);
    }
  });

  router.post('/', async function(req, res, next) {
    const product = req.body;
    console.log(product);
    try {
      const productsId = await inventoryService.createProduct(product);
      res.status(201).json({
        data: productsId,
        message: 'products created'
      });
    } catch {
      next(error);
    }
  });

  router.put('/:productId', async function(req, res, next) {
    const productId = req.params.productId;
    const product = req.body;
    try {
      const updateProductsId = await inventoryService.updateProduct(
        product,
        productId
      );
      console.log(productsMock);
      res.status(200).json({
        data: updateProductsId,
        message: 'products update'
      });
    } catch {
      next(error);
    }
  });

  router.delete('/:productId', async function(req, res, next) {
    const productId = req.params.productId;
    try {
      const deleteProductsId = await inventoryService.deletedProduct(productId);
      console.log(productsMock);
      res.status(200).json({
        data: deleteProductsId,
        message: 'product remove'
      });
    } catch {
      next(error);
    }
  });
}

module.exports = inventarioApi;
