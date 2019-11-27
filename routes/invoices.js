const express = require('express');
const passport = require('passport');
const InvoicesService = require('../services/invoices');
const ProductsService = require('../services/products');
const {
    createInvoiceSchema
} = require('../schemas/invoices');
const validationHandler = require('../utils/middleware/validationHandler');
const {
    handleCreateRequest,
    handleGetRequest
} = require('../utils/handleSuccessfulRequest');

require('../utils/strategies/jwt');

function invoicesApi(app) {
    const router = express.Router();
    app.use('/api/invoices', router);

    const invoicesService = new InvoicesService();
    const productsService = new ProductsService();

    router.get('/', passport.authenticate('jwt', {
        session: false
    }), async function (req, res, next) {
        try {
            const invoices = await invoicesService.getInvoices(req.user._id);
            invoices.sort((x, y) => y.creationDate - x.creationDate);
            handleGetRequest(res, invoices, 'Facturas', 'as');
        } catch (error) {
            next(error);
        }
    });

    router.post('/', passport.authenticate('jwt', {
        session: false
    }), validationHandler(createInvoiceSchema), async function (req, res, next) {
        const {
            body: invoice
        } = req;
        try {
            const createdInvoiceId = await invoicesService.createInvoice({
                invoice,
                user: req.user._id
            });
            const updatedProductsUnits = await productsService.decreaseProductsUnits(invoice.soldProducts);

            handleCreateRequest(res, {
                createdInvoiceId,
                updatedProductsUnits
            }, 'Factura', 'a');
        } catch (error) {
            next(error);
        }
    });
};

module.exports = invoicesApi;