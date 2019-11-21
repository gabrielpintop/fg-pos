const express = require('express');
const passport = require('passport');
const ProductsService = require('../services/products');
const {
  handleGetRequest
} = require('../utils/handleSuccessfulRequest');

require('../utils/strategies/jwt');

function productsApi(app) {
  const router = express.Router();
  const productsService = new ProductsService();
  app.use('/api/products', router);

  router.get('/', passport.authenticate('jwt', {
    session: false
  }), async function (req, res, next) {
    const products = await productsService.getProducts(req.user._id);
    console.log(products);

    try {
      products.sort((a, b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      res.status(200).json({
        data: products,
        message: 'Productos listados'
      });
    } catch (error) {
      next(error);
    }
  });

  router.get('/:productId', passport.authenticate('jwt', {
    session: false
  }), async function (req, res, next) {
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

  router.post('/', passport.authenticate('jwt', {
    session: false
  }), async function (req, res, next) {
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

  router.put('/:productId', passport.authenticate('jwt', {
    session: false
  }), async function (req, res, next) {
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

  router.delete('/:productId', passport.authenticate('jwt', {
    session: false
  }), async function (req, res, next) {
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